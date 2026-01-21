import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars from .env.local
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use SERVICE_ROLE_KEY for automation scripts to bypass RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const parser = new Parser();
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

async function summarizeContent(title, excerpt) {
    if (!genAI) return excerpt;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

async function updateNews() {
    try {
        console.log('--- STARTING NEWS UPDATE ---');
        console.log('Fetching news from Artificial Intelligence News...');
        const feed = await parser.parseURL('https://www.artificialintelligence-news.com/feed/');

        // Take the latest 5 items
        const latestItems = feed.items.slice(0, 5);

        for (const item of latestItems) {
            const title = item.title;
            let content = item.contentSnippet || item.content || '';
            const publishedAt = item.pubDate;

            // Extract image URL from 'content:encoded' or inside description
            const contentFull = item['content:encoded'] || item.content || '';
            const imgMatch = contentFull.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : null;

            // Check if news already exists by title
            const { data: existing } = await supabase
                .from('news')
                .select('id')
                .eq('title', title)
                .maybeSingle();

            if (existing) {
                console.log(`Skipping (already exists): ${title}`);
                continue;
            }

            console.log(`Processing: ${title}`);

            // Enhance content with Gemini
            const summary = await summarizeContent(title, content);

            const { error } = await supabase
                .from('news')
                .insert([{
                    title: title,
                    content: summary,
                    image_url: imageUrl,
                    source_url: item.link, // Store original link
                    published_at: new Date(publishedAt).toISOString(),
                    is_published: true
                }]);

            if (error) {
                if (error.code === '42501') {
                    console.error(`RLS Violation: Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local to allow inserts.`);
                    return;
                }
                console.error(`Error inserting ${title}:`, error.message);
            } else {
                console.log(`Successfully added: ${title}`);
            }
        }

        console.log('--- NEWS UPDATE COMPLETE ---');
    } catch (error) {
        console.error('Update news failed:', error);
    }
}

updateNews();
