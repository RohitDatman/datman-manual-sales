const fs = require('fs');
const { google } = require('googleapis');

// Load credentials
const credentials = JSON.parse(fs.readFileSync('credentials.json'));
const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES
});

async function accessGoogleDoc() {
  const client = await auth.getClient();
  const docs = google.docs({ version: 'v1', auth: client });

  const documentId = 'YOUR_DOCUMENT_ID'; // Replace with your Google Doc ID

  const res = await docs.documents.get({ documentId });
  console.log(`Title: ${res.data.title}`);
}
accessGoogleDoc().catch(console.error);
