import ballerina/test;
import ballerina/http;



http:Client testClient = check new ("http://localhost:9090/police-check");

@test:Config {}
public function testCriminalNIC() returns error? {
    string NIC = "19879956432";
    _ = check testPoliceRecords(NIC,"1");
}

@test:Config {}
public function testNonCriminalNIC() returns error? {
    string NIC = "20023301247";
    _ = check testPoliceRecords(NIC,"0");
}

# Description.
#
# + NIC - parameter description  
# + result - parameter description
# + return - return value description
public function testPoliceRecords(string NIC, string result) returns error?{
    http:Response response = check testClient->get("/crime_check_by_id?Id="+NIC);
    test:assertEquals(response.statusCode, http:STATUS_OK);
    test:assertEquals(response.getTextPayload(), result);
} 

@test:Config {}
public function testRecordsOfaCriminal() returns error? {
    string NIC = "19879956432";
    json[] expectedResults = [{"crime_id":1003,"NIC":"19879956432","description":"Vandalism","date":{"year":2023,"month":3,"day":10}},{"crime_id":1005,"NIC":"19879956432","description":"Fraud","date":{"year":2023,"month":5,"day":5}}];
    _ = check testCrminalRecords(NIC, expectedResults);
}

@test:Config {}
public function testRecordsOfaNonCriminal() returns error? {
    string NIC = "20023301247";
    json[] expectedResults = [];
    _ = check testCrminalRecords(NIC, expectedResults);
}

public function testCrminalRecords(string NIC,json[] expectedResults) returns error?{
    http:Response response = check testClient->get("/crimes_by_id?Id="+NIC);
    test:assertEquals(response.statusCode, http:STATUS_OK);
    test:assertEquals(response.getJsonPayload(),expectedResults);
} 
