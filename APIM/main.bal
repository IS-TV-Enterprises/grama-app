import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/sql;
import ballerina/http;
import ballerina/io;
//import ballerina/io;


public type crime record {|
    int crime_id;
    @sql:Column { name: "Id" }
    string NIC;
    @sql:Column { name: "crime_description" }
    string description;
    time:Date date;
|};

public type certificate_request record {|
//add additional fields like date and stuff
    int request_id;
    int division_id;
    string NIC;
    boolean id_check;
    boolean address_check;
    //boolean police_check;
    int status;
|};

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

// police check service
final http:Client policeCheckClient = check new ("localhost:9090");

// address check service

// Id check service

isolated function addCertificateRequest(certificate_request req) returns int|error {

    // get police_check value from police check service
    int police_check = check policeCheckClient->get("/police-check/crime_check_by_id?Id="+req.NIC);
    io:println(police_check);

    // get address_check value from police check service



    // get Id_check value from police check service




    // insert certificate request to database with police_check value
    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO certificate_requests (division_id, NIC, Id_check, address_check, police_check, status)
        VALUES (${req.division_id}, ${req.NIC}, ${req.id_check}, ${req.address_check}, ${police_check}, ${req.status})`);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }
}