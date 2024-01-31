import ballerina/http;
import ballerina/test;

http:Client testClient = check new ("http://localhost:9030/grama-certificate");

//Test 1
public function testGetCrimesById(string NIC, json[] result) returns error?{
    http:Response response = check testClient->get("/crimesById?id="+NIC);
    test:assertEquals(response.statusCode, http:STATUS_OK);
    test:assertEquals(response.getJsonPayload(), result);
} 

@test:Config {}
public function testCriminal() returns error? {
    string NIC = "20006756432";
    json[] expectedResults =[{"crime_id": 1001,"NIC": "20006756432","description": "Theft","date": {"year": 2023,"month": 1,"day": 1}},{"crime_id": 1002,"NIC": "20006756432","description": "Assault","date": {"year": 2023,"month": 2,"day": 15}}];
    _ = check testGetCrimesById(NIC,expectedResults);
}

@test:Config {}
public function testNonCriminal() returns error? {
    string NIC = "20006987661";
    json[] expectedResults =[];
    _ = check testGetCrimesById(NIC,expectedResults);
}

//Test 2
public function testAllCertRequestsById(string NIC, json[] result) returns error?{
    http:Response response = check testClient->get("/allCertRequestsById?id="+NIC);
    test:assertEquals(response.statusCode, http:STATUS_OK);
    test:assertEquals(response.getJsonPayload(), result);
} 


@test:Config {}
public function testCertificateRequests() returns error? {
    string NIC = "20006756432";
    json[] expectedResults =[{"request_id":1,"division_id":1,"NIC":"20006756432","id_check":true,"address_check":false,"police_check":true,"status":0,"date_submitted":{"year":2023,"month":12,"day":10}}];
    _ = check testAllCertRequestsById(NIC,expectedResults);
}

@test:Config {}
public function testNoCertificateRequests() returns error? {
    string NIC = "20006987661";
    json[] expectedResults =[];
    _ = check testAllCertRequestsById(NIC,expectedResults);
}


@test:Config {}
public function testGetAllDivisions() returns error?{
    http:Response response = check testClient->get("/allDivisions");
    test:assertEquals(response.statusCode, http:STATUS_OK);
    // expected result
    json[] expectedResult = [
        {"division_id": 1, "division": "Division A"},
        {"division_id": 2, "division": "Division B"},
        {"division_id": 3, "division": "Division C"},
        {"division_id": 4, "division": "Division D"},
        {"division_id": 5, "division": "Division E"}
    ];


    // Assert that the actual result matches the expected result
    test:assertEquals(response.getJsonPayload(), expectedResult);
} 


@test:Config {}
//Test function to verify the retrieval of all certificate requests
public function testGetAllCertificateRequests() returns error?{
    http:Response response = check testClient->get("/allCertRequests");
    test:assertEquals(response.statusCode, http:STATUS_OK);
    // expected result
    json[] expectedResult = [
       {"request_id":1,"division_id":1,"NIC":"20006756432","id_check":true,"address_check":false,"police_check":true,"status":0,"date_submitted":{"year":2023,"month":12,"day":10}},
       {"request_id":2,"division_id":1,"NIC":"19879956432","id_check":true,"address_check":true,"police_check":true,"status":0,"date_submitted":{"year":2023,"month":12,"day":10}}
    ];


    // Assert that the actual result matches the expected result
    test:assertEquals(response.getJsonPayload(), expectedResult);
} 



