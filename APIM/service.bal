import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/http;





service /grama\-certificate on new http:Listener(9070) {

    isolated resource function get allCertRequests() returns certificate_request[]|error{
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



}



