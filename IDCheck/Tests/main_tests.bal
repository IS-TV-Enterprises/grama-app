import ballerina/test;
import ballerina/http;
import ballerina/io;


http:Client testClient = check new ("http://localhost:9070/id_check");


@test:Config {}
public function testUserNIC() returns error? {
    string NIC = "19879956432";
    _ = check testNIC(NIC,"1");
}

@test:Config {}
public function testNonUserNIC() returns error? {
    string NIC = "20023301247";
    _ = check testNIC(NIC,"0");
}

# Description.
#
# + NIC - parameter description  
# + result - parameter description
# + return - return value description
public function testNIC(string NIC, string result) returns error?{
    http:Response response = check testClient->get("/citizen_by_NIC?id="+NIC);
    io:println(response);
    test:assertEquals(response.statusCode, http:STATUS_OK);
    test:assertEquals(response.getTextPayload(), result);
} 
