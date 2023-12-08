import ballerina/log;
import ballerina/http;
import ballerinax/twilio;

configurable string accountSId = ?;
configurable string authToken = ?;
configurable string fromNo = ?;

// connection configuration
twilio:ConnectionConfig twilioConfig = {
    twilioAuth: {
        accountSId: accountSId,
        authToken: authToken
    }
};

listener http:Listener httpListener = new (8080);

service / on httpListener {

resource function get greeting/[string name]() returns string {
return "Hello " + name;
}

resource function post twiliomsg/[string toNo]/[string msg]() returns error? {

    //Twilio Client
    twilio:Client twilioClient = check new (twilioConfig);

    //Get account detail remote function is called by the twilio client
    var details = twilioClient->getAccountDetails();

    //Response is printed as log messages
    if (details is twilio:Account) {
        log:printInfo("Account Detail: " + details.toString());
    } else {
        log:printInfo(details.message());
    }

    //Send SMS remote function is called by the twilio client
    var messageDetails = twilioClient->sendSms(fromNo,"+".concat(toNo), msg);

    //Response is printed as log messages
    if (messageDetails is twilio:SmsResponse) {
        log:printInfo("SMS_SID: " + messageDetails.sid.toString() + ", Body: " + messageDetails.body.toString());
    } else {
        log:printInfo(messageDetails.message());
    }
}
}