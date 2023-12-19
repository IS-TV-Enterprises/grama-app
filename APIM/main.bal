import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/sql;
import ballerina/http;
import ballerina/io;
import ballerina/url;

public type division_record record {|
    @sql:Column { name: "division_id" }
    int division_id;
     @sql:Column { name: "division" }
    string division;
|};


public type crime record {|
    int crime_id;
    @sql:Column { name: "Id" }
    string NIC;
    @sql:Column { name: "crime_description" }
    string description;
    time:Date date;
|};


public type certificate_request_body record {|
//add additional fields like date and stuff
    int division_id;
    string NIC;
    string address;
|};

public type certificate_request record {|
//add additional fields like date and stuff
    int request_id;
    int division_id;
    string NIC;
    boolean id_check;
    boolean address_check;
    boolean police_check;
    int status;
    time:Date date_submitted;
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

// Id check service
final http:Client IDCheckClient = check new ("localhost:9070");


// address check service
final http:Client AddressCheckClient = check new ("localhost:9050");

//Inpput parameters : NIC, Address, division id
isolated function addCertificateRequest(certificate_request_body req) returns int|error {
    // Encoding a URL component into a string.
    string encodedAddress = check url:encode(req.address, "UTF-8");

    // get police_check value from police check service
    int police_check = check policeCheckClient->get("/police-check/crime_check_by_id?Id="+req.NIC);
    

    // get Id_check value from ID check service
    //returns the address_id if there's a user
    int address_Id = check IDCheckClient->get("/id_check/citizen_by_NIC?id="+req.NIC);


    int Id_check = address_Id > 0 ? 1 : 0;

    // get address_check value from address check service
    int address_check = check AddressCheckClient->get(string `/address-check/check_user_address_and_division?addressId=${address_Id}&divisionId=${req.division_id}&userAddress=${encodedAddress}`);

    // intial request status (processing=0, approved=1, rejected=2, smth like that)
    int request_status=0;
    
    //req time
    time:Utc currTime = time:utcNow();
    string dateUtc = time:utcToString(currTime);
   
    string date = dateUtc.substring(0, 10);
    io:println(date);
    io:println("Date: ", date);
    


    // insert certificate request to database with police_check value
    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO certificate_requests (division_id, NIC, Id_check, address_check, police_check, status,date_submitted)
        VALUES (${req.division_id}, ${req.NIC}, ${Id_check}, ${address_check}, ${police_check}, ${request_status},${date})`);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        return lastInsertId;
    } 
    else {
        return error("Unable to obtain last insert ID");
    }
}


isolated function updateStatus(int status, int id) returns int|error{
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE certificate_requests
        SET status = ${status}
        WHERE request_id = ${id}`);
    int|string? lastInsertId = result.affectedRowCount;
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Unable to obtain last insert ID");
    }

        
}

isolated function crimesById(string Id) returns crime[]|error{
    crime[] crimes = check policeCheckClient->get("/police-check/crimes_by_id?Id="+Id);
    //io:println(crimes);
    return crimes;
}