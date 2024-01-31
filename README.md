# ocr_sdk_integration_sample

## Introduction
This repository is hosting the demo for the OCR Confirmation SDK.

## Setup
- Have npm and yarn install
- Run npm install to install the required modules
- Put in the API_KEY and API_ENDPOINT at index.js

## Demo sample flow:

1. Start server.js using yarn start
2. When page is loaded, calls the sdk/token API to request for a token using the endpoint and API key
3. Show user the form with session ID and ID type dropdown
4. User fills in the session ID and the ID type
5. User clicks on the submit button
6. Calls the requery API to get the EKYC details based on the session ID
7. If the API returns details and matches the ID type selected, extract the required OCR info for the SDK and put in a JSON object
8. Put required info into a JSON object
	- token
	- endpoint
	- session ID
	- ID type
	- ocr info
9. Then use localStorage to store the JSON object (in string)
10. Redirects user to the OCR SDK page

11. When page onload, get the stringify JSON object, convert back to JSON object
12. Then use the info in the JSON object to initialize the SDK

## SDK Initialization Example:
```
OCRSdk.initialize(
	"ocr", // containerId
	jsonObject.token, // tokenId (get this from "key" in key.json of the ekyc web sdk)
	jsonObject.endpoint, // endpoint 'Staging',
	jsonObject.sessionId, // sessionId 'YOUR_SESSION_ID',
	jsonObject.idType, // idType
	jsonObject.ocrInfo //ocr response
)
```

```	
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
```