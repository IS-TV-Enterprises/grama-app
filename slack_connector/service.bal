import ballerina/http;
import ballerinax/slack;
import ballerina/log;

slack:ConnectionConfig slackConfig = {
    auth: {
        token: access_token
    }
};

// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"] // add front end host url here
    }
}


service / on new http:Listener(8080) {

resource function get greeting() returns string {
    log:printInfo("Hello, World!");
    return "Hello, World!";
}
resource function post sendmsg/[string msg]() returns error? {

    
    slack:Client slackClient = check new (slackConfig);

    slack:Message messageParams = {
        channelName: "grama-support",
        text: msg
    };

    // Post a message to a channel.
    string postResponse = check slackClient->postMessage(messageParams);
    log:printInfo("Message sent" + postResponse);

    }


// give me the same function as above but this time it takes the message from the body of the request
resource function post sendmsgjson(MSG msg) returns error? {
    slack:Client slackClient = check new (slackConfig);

    slack:Message messageParams = {
        channelName: "grama-support",
        text: msg.message + " from " + msg.name
    };

    // Post a message to a channel.
    string postResponse = check slackClient->postMessage(messageParams);
    log:printInfo("Message sent" + postResponse);

}
}