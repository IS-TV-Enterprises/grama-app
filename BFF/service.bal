import ballerina/http;
import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.

// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"] // add front end host url here
    }
}

service /grama\-certificate on new http:Listener(9030) {
    //get all certificate requests
    isolated resource function get allCertRequests() returns certificate_request[]|error {

        certificate_request[] certificate_requests = [];
        stream<certificate_request, error?> resultStream = dbClient->query(`select * from certificate_requests where status = 0`);
        check from certificate_request req in resultStream
            do {
                certificate_requests.push(req);
            };
        check resultStream.close();
        return certificate_requests;
    }

    isolated resource function get allCertRequestsById(string id) returns certificate_request[]|error {

        certificate_request[] certificate_requests = [];
        stream<certificate_request, error?> resultStream = dbClient->query(`select * from certificate_requests where NIC = ${id}`);
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

    isolated resource function get allDivisions() returns division_record[]|error {
        division_record[] divisions = [];
        stream<division_record, error?> resultStream = dbClient->query(`select * from divisions;`);
        check from division_record result in resultStream
            do {
                divisions.push(result);
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

