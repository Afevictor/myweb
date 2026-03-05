export default async function handler(req, res) {
    let mailText = "NOT_CALLED";
    try {
        const k = process.env.WEB3FORMS_ACCESS_KEY || "NONE";
        const mailResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: k,
                name: "Test",
                email: "test@test.com",
                message: "Test",
                subject: "test"
            })
        });
        mailText = await mailResponse.text();
    } catch (e) { mailText = e.message; }

    res.status(200).json({
        airtableSet: !!process.env.AIRTABLE_PAT,
        web3formsSet: !!process.env.WEB3FORMS_ACCESS_KEY,
        web3Result: mailText.substring(0, 300)
    });
}
