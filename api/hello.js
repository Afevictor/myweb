export default function handler(req, res) {
    res.status(200).json({
        airtableSet: !!process.env.AIRTABLE_PAT,
        web3formsSet: !!process.env.WEB3FORMS_ACCESS_KEY,
        web3key: process.env.WEB3FORMS_ACCESS_KEY ? "EXISTS" : "MISSING",
        airtableBase: process.env.AIRTABLE_BASE_ID || "MISSING",
        isAirtableTableIdSet: !!process.env.AIRTABLE_TABLE_ID
    });
}
