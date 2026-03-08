import Parser from 'rss-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from .env.local (only needed for local runs)
dotenv.config({ path: join(__dirname, '../.env.local') });

const geminiApiKey = process.env.GEMINI_API_KEY;
const parser = new Parser();
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

// Output path: the static JSON file the NewsPage reads from
const OUTPUT_PATH = join(__dirname, '../src/data/news.json');

// A small set of fallback images in case the RSS feed has none
const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
];

function generateId() {
    return Math.random().toString(36).substring(2, 11);
}

async function summarizeContent(title, excerpt) {
    if (!genAI || !excerpt) return excerpt || '';

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Rewrite the following AI news summary to be professional, engaging, and concise (max 300 characters). 
Focus on the business impact and lead generation for an AI consultancy.
Title: ${title}
Original Content: ${excerpt}

Refined Summary:`;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (err) {
        console.error('Gemini summarization failed:', err.message);
        return excerpt;
    }
}

async function fetchNews() {
    try {
        console.log('--- STARTING NEWS FETCH ---');
        console.log('Fetching from Artificial Intelligence News RSS feed...');

        const feed = await parser.parseURL('https://www.artificialintelligence-news.com/feed/');

        // Take the latest 5 items
        const latestItems = feed.items.slice(0, 5);
        const newsItems = [];

        for (let i = 0; i < latestItems.length; i++) {
            const item = latestItems[i];
            const title = item.title || 'Untitled';
            const excerpt = item.contentSnippet || item.content || '';
            const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();

            // Extract image from content:encoded or description
            const contentFull = item['content:encoded'] || item.content || '';
            const imgMatch = contentFull.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

            console.log(`Processing (${i + 1}/${latestItems.length}): ${title}`);

            // Optionally enhance summary with Gemini
            const summary = await summarizeContent(title, excerpt);

            newsItems.push({
                id: generateId(),
                title,
                summary,
                category: 'General AI',
                date: publishedAt,
                image_url: imageUrl,
                source_url: item.link || '#',
            });
        }

        // Write the result to src/data/news.json
        writeFileSync(OUTPUT_PATH, JSON.stringify(newsItems, null, 2), 'utf8');
        console.log(`\n✅ Wrote ${newsItems.length} articles to src/data/news.json`);
        console.log('--- NEWS FETCH COMPLETE ---');

    } catch (error) {
        console.error('❌ Fetch failed:', error);
        process.exit(1);
    }
}

fetchNews();
