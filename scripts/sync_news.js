import Parser from 'rss-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const geminiApiKey = process.env.GEMINI_API_KEY;
const parser = new Parser();
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

async function summarizeNews(items) {
    if (!genAI) return items;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const newsContext = items.map(item => `Title: ${item.title}\nExcerpt: ${item.contentSnapshot}\nLink: ${item.link}`).join('\n\n');

    const prompt = `You are an AI Automation Consultant. Below are the latest headlines from AI news sites.
  Pick the 5 most important ones.
  For each one:
  1. Professional Title (Engaging but concise)
  2. Brief Summary (Max 2 sentences, focusing on business impact)
  3. Category (e.g., Enterprise, Automation, Research, Ethics)
  4. Keep the original source link.
  
  Return the result as a strict JSON array of objects with keys: id (string), title, summary, category, date (ISO string), image_url, and source_url.
  
  News Context:
  ${newsContext}
  
  Only return JSON. Nothing else.`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, '').trim();
        const cleanedItems = JSON.parse(text);

        // Supplement images from original items if missing
        return cleanedItems.map((item, idx) => ({
            ...item,
            image_url: items.find(orig => orig.link === item.source_url)?.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
        }));
    } catch (err) {
        console.error('Gemini processing failed:', err);
        return items.slice(0, 5).map(item => ({
            id: Math.random().toString(36).substr(2, 9),
            title: item.title,
            summary: item.contentSnippet,
            category: 'General AI',
            date: new Date().toISOString(),
            image_url: item.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
            source_url: item.link
        }));
    }
}

async function fetchFromAINewsTech() {
    try {
        const feed = await parser.parseURL('https://www.artificialintelligence-news.com/feed/');
        return feed.items.map(item => {
            // Extract image from content:encoded
            const content = item['content:encoded'] || item.content || '';
            const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
            return {
                title: item.title,
                link: item.link,
                contentSnapshot: item.contentSnippet,
                imageUrl: imgMatch ? imgMatch[1] : null,
                date: item.pubDate
            };
        });
    } catch (err) {
        console.error('Fetch AI News Tech failed:', err);
        return [];
    }
}

async function run() {
    console.log('🔄 Starting Daily News Sync...');

    const techNews = await fetchFromAINewsTech();

    // Mix in any other sources here if needed

    const finalNews = await summarizeNews(techNews);

    const dataPath = path.join(__dirname, '../src/data/news.json');
    fs.writeFileSync(dataPath, JSON.stringify(finalNews, null, 2));

    console.log('✅ Daily News updated successfully!');
}

run();
