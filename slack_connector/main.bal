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

slack:ConnectionConfig slackConfig = {
    auth: {
        token: "xoxb-6302138382402-6307198246323-mmWuPdXZHpVXsQhpn2aBUqDw"
    }
};

public function main() returns error? {
    // slack:Client slackClient = check new (slackConfig);

    // slack:Message messageParams = {
    //     channelName: "grama-support",
    //     text: "Hi, guys this is a test message from Ballerina."
    // };

    // // Post a message to a channel.
    // string postResponse = check slackClient->postMessage(messageParams);
    // log:printInfo("Message sent" + postResponse);
}

listener http:Listener httpListener = new (8080);

service / on httpListener {

resource function get greeting/[string name]() returns string {
return "Hello " + name;
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
}