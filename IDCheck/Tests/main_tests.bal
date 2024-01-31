import ballerina/http;
import ballerina/test;

http:Client testClient = check new ("http://localhost:9070/id_check");


public function testNIC(string NIC, string result) returns error?{
    http:Response response = check testClient->get("/citizen_by_NIC?id="+NIC);
    test:assertEquals(response.statusCode, http:STATUS_OK);
    test:assertEquals(response.getTextPayload(), result);
} 

//test a citizen's NIC in the database
// This function tests the validity of a citizen's NIC by querying the database.
@test:Config {}
public function testuserNIC() returns error? {
    string NIC = "19879956432";
    _ = check testNIC(NIC,"1");
}

//Test an invalid NIC
@test:Config {}
public function testNonCUserNIC() returns error? {
    string NIC = "20023301247";
    _ = check testNIC(NIC,"0");
}

