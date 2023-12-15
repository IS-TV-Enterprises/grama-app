import ballerina/log;
import ballerina/http;
import ballerinax/twilio;

// connection configuration
twilio:ConnectionConfig twilioConfig = {
    twilioAuth: {
        accountSId: accountSId,
        authToken: authToken
    }
};
// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"] // add front end host url here
    }
}


service / on new http:Listener(8080) {

resource function get greeting/[string name]() returns string {
return "Hello " + name;
}

// resource function post twiliomsg/[string toNo]/[string msg]() returns error? {

//     //Twilio Client
//     twilio:Client twilioClient = check new (twilioConfig);

//     //Get account detail remote function is called by the twilio client
//     var details = twilioClient->getAccountDetails();

//     //Response is printed as log messages
//     if (details is twilio:Account) {
//         log:printInfo("Account Detail: " + details.toString());
//     } else {
//         log:printInfo(details.message());
//     }

//     //Send SMS remote function is called by the twilio client
//     var messageDetails = twilioClient->sendSms(fromNo,"+".concat(toNo), msg);

//     //Response is printed as log messages
//     if (messageDetails is twilio:SmsResponse) {
//         log:printInfo("SMS_SID: " + messageDetails.sid.toString() + ", Body: " + messageDetails.body.toString());
//     } else {
//         log:printInfo(messageDetails.message());
//     }
// }

// give me the same function as above but this time it takes the message from the body of the request
resource function post twiliomsgjson(MSG msg) returns error? {
    //Twilio Client
    twilio:Client twilioClient = check new (twilioConfig);

        //Send SMS remote function is called by the twilio client
    var messageDetails = twilioClient->sendSms(fromNo,"+".concat(msg.number), msg.message);

    //Response is printed as log messages
    if (messageDetails is twilio:SmsResponse) {
        log:printInfo("SMS_SID: " + messageDetails.sid.toString() + ", Body: " + messageDetails.body.toString());
    } else {
        log:printInfo(messageDetails.message());
    }
}

}

