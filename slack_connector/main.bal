// Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/log;
import ballerinax/slack;
import ballerina/http;

configurable string access_token = ?;

type MSG readonly & record {|
    string name;
    string message;
|};

slack:ConnectionConfig slackConfig = {
    auth: {
        token: access_token
    }
};

listener http:Listener httpListener = new (8080);

service / on httpListener {


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