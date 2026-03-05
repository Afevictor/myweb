
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
        let emailSuccess = false;
        let emailDetails = null;

        // --- 1. SEND EMAIL via Web3Forms (if configured) ---
        if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE') {
            try {
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

                const mailText = await mailResponse.text();
                try {
                    emailDetails = JSON.parse(mailText);
                    emailSuccess = emailDetails.success === true;
                } catch (e) {
                    console.error('Mail Service non-JSON response:', mailText.substring(0, 200));
                    emailDetails = { error: 'Invalid JSON response from mail service' };
                }
            } catch (mailErr) {
                console.error('Mail Catch Error:', mailErr);
                emailDetails = { error: mailErr.message };
            }
        } else {
            emailDetails = { skipped: 'No Web3Forms key provided.' };
        }

        // --- 2. PUSH TO AIRTABLE ---
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

        // Return unified status response
        if (airtableSuccess || emailSuccess) {
            return res.status(200).json({
                message: 'Success',
                airtable: airtableSuccess,
                email: emailSuccess,
                details: { airtable: airtableDetails, email: emailDetails }
            });
        } else {
            console.error('Both Services Failed or were Skipped.');
            return res.status(500).json({
                message: 'Error processing lead',
                airtable: airtableSuccess,
                email: emailSuccess,
                details: { airtable: airtableDetails, email: emailDetails }
            });
        }
    } catch (err) {
        console.error('Contact API Internal Error:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}
