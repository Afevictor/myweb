const https = require('https');

const cloudName = 'dygxs8rl5';
const apiKey = '364637986469314';
const apiSecret = 'C8I3DO38S7vDiRwNiZ3EikDTtng';

function fetchCloudinary(type) {
    return new Promise((resolve, reject) => {
        const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
        const options = {
            hostname: 'api.cloudinary.com',
            path: `/v1_1/${cloudName}/resources/${type}?max_results=100`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${auth}`
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function main() {
    console.log('--- CLOUDINARY ASSETS ---');
    try {
        const images = await fetchCloudinary('image');
        console.log('\nIMAGES:');
        images.resources.forEach(r => console.log(`ID: ${r.public_id} | Path: ${r.secure_url}`));

        const videos = await fetchCloudinary('video');
        console.log('\nVIDEOS:');
        videos.resources.forEach(r => console.log(`ID: ${r.public_id} | Path: ${r.secure_url}`));
    } catch (e) {
        console.error(e);
    }
}

main();
