import btoa from 'btoa';
import fetch from 'node-fetch';

const cloudName = 'dygxs8rl5';
const apiKey = '364637986469314';
const apiSecret = 'C8I3DO38S7vDiRwNiZ3EikDTtng';

async function listResources() {
    const auth = btoa(`${apiKey}:${apiSecret}`);
    const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources`;

    console.log('--- FETCHING CLOUDINARY ASSETS ---');

    try {
        // Fetch images
        const imgRes = await fetch(`${baseUrl}/image?max_results=100`, {
            headers: { 'Authorization': `Basic ${auth}` }
        });
        const images = await imgRes.json();

        console.log('\nIMAGES:');
        if (images.resources) {
            images.resources.forEach(r => console.log(`- ${r.public_id} (${r.format}) | URL: ${r.secure_url}`));
        } else {
            console.log('No images found or error:', images);
        }

        // Fetch videos
        const vidRes = await fetch(`${baseUrl}/video?max_results=100`, {
            headers: { 'Authorization': `Basic ${auth}` }
        });
        const videos = await vidRes.json();

        console.log('\nVIDEOS:');
        if (videos.resources) {
            videos.resources.forEach(r => console.log(`- ${r.public_id} (${r.format}) | URL: ${r.secure_url}`));
        } else {
            console.log('No videos found or error:', videos);
        }

    } catch (err) {
        console.error('Error fetching from Cloudinary:', err);
    }
}

listResources();
