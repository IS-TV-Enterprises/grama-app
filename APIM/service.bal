import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/http;
import ballerina/log;


// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"], // add front end host url here
        allowCredentials: true
    }
}



service /grama\-certificate on new http:Listener(9030) {

    isolated resource function get allCertRequests() returns certificate_request[]|error{
         log:printInfo("Transaction committed");
        certificate_request[] certificate_requests = [];
        stream<certificate_request, error?> resultStream = dbClient->query(`select * from certificate_requests`);
        check from certificate_request req in resultStream
            do {
                certificate_requests.push(req);
            };
        check resultStream.close();
        return certificate_requests;
    }
    
    

    isolated resource function post addCertificateRequest(@http:Payload certificate_request_body req) returns int|error? {
        //req should be in the form { "division_id": 1, "NIC": "string", "address": "string" }
        return addCertificateRequest(req);
    }

    isolated resource function get allDivisions() returns string[]|error{
        string[] divisions = [];
        stream<record{|string division;|}, error?> resultStream = dbClient->query(`select division from divisions;`);
        check from record{|string division;|}? result in resultStream
            do {
                divisions.push(result.division);
            };
        check resultStream.close();
        return divisions;
    }

    isolated resource function patch updateStatus(int status, int id) returns int|error? {
        return updateStatus(status, id);
        
    }

    isolated resource function get crimesById(string id) returns crime[]|error? {
        return crimesById(id);
        
    }



}



