/** @format */


let data = {
    "i": "8052345",
    "f": "www.datman.com",
    "TradingName": "anil",
    "BusinessPhoneNumber": "7765429465",
    "MerchantURL": "https://www.google.com",
    "MerchantEmail": "anil.kumar.s+089@datman.je",
    "BusinessAddress1": "56th Street",
    "BusinessAddress2": "Stoke-On-Trent",
    "BusinessAddressCity": "Stoke on Trent1",
    "BusinessAddressPostcode": "ST4ABV",
    "BusinessAddressCountry": "United Kingdom",
    "OwnerTitle": "Miss",
    "OwnerFirstName": "anil",
    "OwnerLastName": "test",
    "OwnerEmail": "anil.kumar.s+089@datman.je",
    "OwnerBirthDate": "1999-10-01",
    "OwnerPhoneNumber": "7765429465",
    "OwnerAddress1": "20 Willotts Hill Road",
    "OwnerAddress2": "Newcastle under Lyme",
    "OwnerAddressCity": "Newcastle",
    "OwnerAddressPostcode": "CR03ND",
    "OwnerAddressCountry": "United Kingdom",
    "ClientType": "T2S", 
    "CompanyInfo1": "",
    "providers1": "[]"
    // "MerchantType": "O2M"  // possible values -> DATMAN-RESELLER, DATMAN-DELIVERY-PARTNER, O2M,  O2M-RESELLER
}
// const base64 =   "ewogICAgImkiOiAiODExMTExIiwKICAgICJmIjogInd3dy5vbW5pLXBheS5jb20iLAogICAgIlRyYWRpbmdOYW1lIjogIk5hcnV0byBVSyBUZXN0IGFjY291bnQgMjB0aCBBcHJpbCIsCiAgICAiQnVzaW5lc3NQaG9uZU51bWJlciI6ICI3NzAwMTUwODE2IiwKICAgICJNZXJjaGFudFVSTCI6ICJ3d3cuZGF0bWFuLmplIiwKICAgICJNZXJjaGFudEVtYWlsIjogInlhc2h3YW50K3VrKzIwMEBkYXRtYW4uamUiLAogICAgIkJ1c2luZXNzQWRkcmVzczEiOiAiNTV0aCBTdHJlZXQiLAogICAgIkJ1c2luZXNzQWRkcmVzczIiOiAiU3Rva2UtT24tVHJlbnQiLAogICAgIkJ1c2luZXNzQWRkcmVzc0NpdHkiOiAiU3Rva2Ugb24gVHJlbnQxIiwKICAgICJCdXNpbmVzc0FkZHJlc3NQb3N0Y29kZSI6ICJTVDRBQlYiLAogICAgIkJ1c2luZXNzQWRkcmVzc0NvdW50cnkiOiAiVW5pdGVkIEtpbmdkb20iLAogICAgIk93bmVyRmlyc3ROYW1lIjogIllhc2h3YW50IiwKICAgICJPd25lckxhc3ROYW1lIjogIlRlc3QiLAogICAgIk93bmVyRW1haWwiOiJ5YXNod2FudCt1aysyMDBAZGF0bWFuLmplIiwKICAgICJPd25lclBob25lTnVtYmVyIjogIjg2MTkzMDc3NjIiLAogICAgIk93bmVyQWRkcmVzczEiOiAiMiBXaWxsb3R0cyBIaWxsIFJvYWQiLAogICAgIk93bmVyQWRkcmVzczIiOiAiTmV3Y2FzdGxlIHVuZGVyIEx5bWUiLAogICAgIk93bmVyQWRkcmVzc0NpdHkiOiAiTmV3Y2FzdGxlIiwKICAgICJPd25lckFkZHJlc3NQb3N0Y29kZSI6ICJTVDVBQkMiLAogICAgIk93bmVyQWRkcmVzc0NvdW50cnkiOiAiVW5pdGVkIEtpbmdkb20iLAogICAgIkNsaWVudFR5cGUiOiAiVDJTIiwKICAgICJDb21wYW55SW5mbyI6ICIiLAogICAgInByb3ZpZGVyczEiOiAiW2FkeWVuLGRuYV0iLAogICAgIk1lcmNoYW50VHlwZTEyMzQiOiAiREFUTUFOLURFTElWRVJZLVBBUlRORVIiCn0="
const base64 =  Buffer.from(JSON.stringify(data)).toString('base64')
 const secret = "yVocBE5tmw82I0ZM"; 


const crypto = require("crypto");

const webhookAuth = async () => {
    var hmac = crypto.createHmac("sha256", secret);
    hmac.update(base64);
    var signature = hmac.digest("hex");
    console.log("signature to compare", signature);

    console.log(`https://ws1-portal.datmancrm.com/signup?q=${base64}&signature=${signature}`)
    // console.log(`https://ws1-portal.datmancrm.com/signup?q=${base64}&signature=${signature}`)
    // console.log(`https://stage-101-mms.datmancrm.com//signup?q=${base64}&signature=${signature}`)


    return true;

};
webhookAuth();
