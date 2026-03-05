
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { fullName, email, goals, source } = req.body;

    // You can set your email here or in an environment variable
    const DESTINATION_EMAIL = process.env.CONTACT_EMAIL || 'victor@verturntech.cv';

    // We use Web3Forms as a reliable "backend" sender for serverless environments.
    // The user should get a free Access Key at https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    try {
        // --- 1. SEND EMAIL via Web3Forms ---
        const mailResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                name: fullName,
                email: email,
                message: goals,
                subject: `🚀 New Lead from Verturn AI: ${fullName} (${source || 'Contact Form'})`,
                from_name: 'Verturn AI Notification',
                replyto: email,
            })
        });

        // --- 2. PUSH TO AIRTABLE (Optional) ---
        const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads';

        if (AIRTABLE_PAT && AIRTABLE_BASE_ID) {
            try {
                await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
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
                console.log('Successfully pushed to Airtable');
            } catch (atError) {
                console.error('Airtable Sync Error:', atError);
            }
        }

        const mailResult = await mailResponse.json();

        if (mailResult.success) {
            return res.status(200).json({ message: 'Success' });
        } else {
            return res.status(500).json({ message: 'Error from mail service', details: mailResult });
        }
    } catch (err) {
        console.error('Contact API Error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
