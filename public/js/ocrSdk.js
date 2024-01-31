// Place this script in your app.js or a designated JavaScript file
window.onload = function () {
  const jsonObjectStr = localStorage.getItem("sdkJSON");
  const jsonObject = JSON.parse(jsonObjectStr);

  if(jsonObject != ""){
    //Clear localStorage
    localStorage.clear();
    // Call SDK initialization when the page loads
    OCRSdk.initialize(
      "ocr", // containerId
      jsonObject.token, // tokenId (get this from "key" in key.json of the ekyc web sdk)
      jsonObject.endpoint, // endpoint 'Staging',
      jsonObject.sessionId, // sessionId 'YOUR_SESSION_ID',
      jsonObject.idType, // idType
      jsonObject.ocrInfo //ocr response
    )
  }
}


function sampleFunction() {
  OCRSdk.initialize(
    "ocr", // containerId
    "5d7ce3bc-fbe0-4647-afa9-66785d168271", // tokenId (get this from "key" in key.json of the ekyc web sdk)
    "https://dashboard-ekyc.posdigicert.com.my/posdigicert/", // endpoint 'Staging',
    "cf9ff16e-c093-4544-b1cf-79c6d63115aa", // sessionId 'YOUR_SESSION_ID',
    "mykad", // idType

    {
      documentImageBase64: "",
      type: "FRONT",
      idFraudDetected: false,
      isValid: true,
      icNumber: "000127-14-1477",
      name: "LEE KOK KEN",
      birthDate: {
          day: 27,
          month: 1,
          year: 2000,
          originalString: "000127"
      },
      birthDateISO: "2000-01-27",
      street: "NO 200\nTAMAN JUTA",
      city: "KUALA KUBU BHARU",
      state: "SELANGOR",
      zipCode: "44000",
      fullAddress: "NO 200\nTAMAN JUTA\n44000 KUALA KUBU BHARU\nSELANGOR",
      faceImageBase64: "",
      religion: "",
      gender: "M",
    }
  )
}
