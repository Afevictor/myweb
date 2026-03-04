const https = require('https');
const fs = require('fs');

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
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Failed to parse JSON: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function main() {
    let output = '--- CLOUDINARY ASSETS ---\n';
    try {
        const images = await fetchCloudinary('image');
        output += '\nIMAGES:\n';
        if (images.resources) {
            images.resources.forEach(r => output += `ID: ${r.public_id} | Path: ${r.secure_url}\n`);
        } else {
            output += `Error or no images: ${JSON.stringify(images)}\n`;
        }

        const videos = await fetchCloudinary('video');
        output += '\nVIDEOS:\n';
        if (videos.resources) {
            videos.resources.forEach(r => output += `ID: ${r.public_id} | Path: ${r.secure_url}\n`);
        } else {
            output += `Error or no videos: ${JSON.stringify(videos)}\n`;
        }
    } catch (e) {
        output += `Error: ${e.message}\n`;
    }
    fs.writeFileSync('tmp/cloudinary_assets.txt', output);
    console.log('Results saved to tmp/cloudinary_assets.txt');
}

main();
