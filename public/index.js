// Make sure to include Axios in your project.
// You can install it using npm: npm install axios
// Or include it from a CDN in your HTML file.

const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3aXNlYWkiLCJzdWIiOiJ3aXNlYWktYXBpIiwiaWQiOiI5Iiwibm0iOiJEZW1vIiwibWlzYyI6IiIsInZlciI6M30.k6FHr60p5TDPdSXeTmPHScBbmEivKv0zM43A_Wp4YDQ';
const API_ENDPOINT = 'https://dashboard-ekyc.posdigicert.com.my/posdigicert';
const API_REQUEST_TOKEN = '/sdk/token';
const API_EKYC_REQUERY = '/ekyc/requery';

let apiToken = '';

document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM content to be fully loaded

    // Get the form and submit button elements
    const myForm = document.getElementById('myForm');
    const btnSubmit = document.getElementById('btnSubmit');

    // Add an event listener to the submit button
    btnSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        handleFormSubmission();
    });

    // Your custom function to handle the form submission
    function handleFormSubmission() {
        // Get the values from the form elements
        const sessionId = document.getElementById('txtSessionId').value;
        const idType = document.getElementById('ddIdType').value;

        // Perform any further actions with the form data
        console.log('sessionId:', sessionId);
        console.log('idType:', idType);

        getOcrResponse(sessionId, function (error, data) {
            if (error) {
                console.error('Error fetching data from API:', error);
            } else {
                console.log('Data from API getOcrResponse:', data);
                let ocrInfo = {};
                if(idType == 'passport') {
                    if(data.data.passport != undefined) {
                        let passportInfo = data.data.passport;
                        let passportNumber = passportInfo.passportNumber;
                        let dateOfBirth = passportInfo.dateOfBirth;
                        let dateOfExpiry = passportInfo.dateOfExpiry;
                        let issuingCountry = passportInfo.issuingCountry;
                        let nationality = passportInfo.nationality;
                        let name = passportInfo.name;
                        let gender = passportInfo.gender;

                        ocrInfo = {
                            "passportNumber": passportNumber,
                            "dateOfBirth": dateOfBirth,
                            "dateOfExpiry": dateOfExpiry,
                            "issuingCountry": issuingCountry,
                            "nationality": nationality,
                            "name": name,
                            "gender": gender,
                        };
                        
                    } else {
                        console.log("Error on parsing passport info");
                    }
                } else if(idType == 'mykad') {
                    if(data.data.mykadFront != undefined) {
                        let mykadFrontInfo = data.data.mykadFront;
                        let icNumber = mykadFrontInfo.icNumber;
                        let name = mykadFrontInfo.name;
                        let street = mykadFrontInfo.street;
                        let zipCode = mykadFrontInfo.zipCode;
                        let city = mykadFrontInfo.city;
                        let state = mykadFrontInfo.state;

                        ocrInfo = {
                            "icNumber": icNumber,
                            "name": name,
                            "street": street,
                            "zipCode": zipCode,
                            "city": city,
                            "state": state,
                        };
                    } else {
                        console.log("Error on parsing mykad front info");
                    }
                }

                if(ocrInfo != {}) {
                    const jsonObject = {
                        "token": apiToken,
                        "endpoint": API_ENDPOINT,
                        "sessionId": sessionId,
                        "idType": idType,
                        "ocrInfo": ocrInfo,
                    };
                    localStorage.setItem("sdkJSON", JSON.stringify(jsonObject));
                    const currentProtocolAndHost = window.location.protocol + '//' + window.location.host;
                    
                    window.location.href = currentProtocolAndHost + "/ocrSdk.html";
                } else {
                    console.log("Empty OCR info");
                }
            }
        });
    }
});

function getSDKToken(callback) {
    $.ajax({
        url: API_ENDPOINT + API_REQUEST_TOKEN,
        method: 'POST',
        headers: {
            'Authorization': API_TOKEN,
        },
        success: function (data) {
            // Successful response
            callback(null, data);
        },
        error: function (xhr, status, error) {
            // Error response
            callback(`Error fetching data from API. Status: ${status}. Error: ${error}`);
        }
    });
}

function getOcrResponse(sessionId, callback) {
    $.ajax({
        url: API_ENDPOINT + API_EKYC_REQUERY + '/' + sessionId,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3aXNlYWkiLCJzdWIiOiJ3aXNlYWktYXBpIiwiaWQiOiI5Iiwibm0iOiJEZW1vIiwibWlzYyI6IiIsInZlciI6M30.k6FHr60p5TDPdSXeTmPHScBbmEivKv0zM43A_Wp4YDQ'
        },
        success: function (data) {
            // Successful response
            callback(null, data);
        },
        error: function (xhr, status, error) {
            // Error response
            callback(`Error fetching data from API. Status: ${status}. Error: ${error}`);
        }
    });
}

function logOnLoad() {
    console.log("Page has finished loading!");
    getSDKToken(function (error, data) {
            if (error) {
                console.error('Error fetching data from API:', error);
            } else {
                console.log('Data from API:', data);
                apiToken = data.data.token;
                console.log('Token: ', apiToken);
            }
        });
}

window.onload = logOnLoad;