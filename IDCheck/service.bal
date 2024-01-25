import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/http;

configurable string HOST = ? ;
configurable int PORT = ? ;
configurable string USER = ? ;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;

type Citizen record {
    
    string NIC;
    string first_name;
    string last_name;
    int address_id;
};



mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

service /id_check on new http:Listener(9070) {

    //check if the user exists in the Citizen table
    //Output : if a citizen exits returns his address_id(>0), if not returns 0
    resource function get citizen_by_NIC(string id) returns int|error {
        Citizen[] citizens = [];
        stream<Citizen,sql:Error?> resultStream = dbClient->query(`SELECT * FROM citizens WHERE NIC = ${id}`);
        //get each item(citizen) in result stream and add it to the citizens[] list
        check from Citizen citizen in resultStream
            do {
                citizens.push(citizen);
            };
        check resultStream.close();

        return citizens.length() > 0 ? citizens[0].address_id : 0;
    }
}