import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/http;

configurable string HOST = "mysql-241064b1-175e-4ca4-a458-67e0d6bb854d-identity2388360287-c.a.aivencloud.com";
configurable int PORT = 11687;
configurable string USER = "avnadmin";
configurable string PASSWORD = "AVNS_EIZp_gjvMDa9Eu7B7MY";
configurable string DATABASE = "defaultdb";

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
    resource function get citizen_by_NIC(string id) returns boolean|error {
        Citizen[] citizens = [];
        stream<Citizen,sql:Error?> resultStream = dbClient->query(`SELECT * FROM Citizen WHERE NIC = ${id}`);
        check from Citizen citizen in resultStream
            do {
                citizens.push(citizen);
            };
        check resultStream.close();

        return citizens.length() == 0 ? false : true;
    }

}
