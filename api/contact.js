
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { fullName, email, goals, source } = req.body;

    try {
        // --- PUSH TO AIRTABLE ---
        let airtableSuccess = false;
        let airtableDetails = null;

        const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME || 'Leads';

        if (AIRTABLE_PAT && AIRTABLE_BASE_ID) {
            try {
                const atResponse = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${AIRTABLE_PAT}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fields: {
                            'Name': fullName,
                            'Email': email,
                            'Goals': goals,
                            'Source': source || 'Contact Form',
                            'Date': new Date().toISOString()
                        }
                    })
                });

                const atText = await atResponse.text();
                try {
                    airtableDetails = JSON.parse(atText);
                    airtableSuccess = atResponse.ok;
                    if (!atResponse.ok) {
                        console.error('Airtable Sync Error:', airtableDetails);
                    } else {
                        console.log('Successfully pushed to Airtable');
                    }
                } catch (e) {
                    console.error('Airtable non-JSON response:', atText.substring(0, 200));
                    airtableDetails = { error: 'Invalid JSON from Airtable' };
                }
            } catch (err) {
                console.error('Airtable Fetch Exception:', err);
                airtableDetails = { error: err.message };
            }
        } else {
            airtableDetails = { skipped: 'Airtable credentials not fully provided.' };
        }

        // Return status response
        if (airtableSuccess) {
            return res.status(200).json({
                message: 'Success',
                airtable: airtableSuccess,
                details: { airtable: airtableDetails }
            });
        } else {
            console.error('Airtable Service Failed or was Skipped.');
            return res.status(500).json({
                message: 'Error processing lead',
                airtable: airtableSuccess,
                details: { airtable: airtableDetails }
            });
        }
    } catch (err) {
        console.error('Contact API Internal Error:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}
