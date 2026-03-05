
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
        const response = await fetch('https://api.web3forms.com/submit', {
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

        const result = await response.json();

        if (result.success) {
            return res.status(200).json({ message: 'Success' });
        } else {
            return res.status(500).json({ message: 'Error from mail service', details: result });
        }
    } catch (err) {
        console.error('Contact API Error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
