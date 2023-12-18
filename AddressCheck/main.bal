import ballerinax/mysql;
import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/http;

public type address record {
    int address_id;
    string address_line1;
    string address_line2;
    int division_id;
};

public type gramaNiladari record {
    string NIC;
    string first_name;
    string last_name;
    int division_id;
};

public type division record {
    int division_id;
    string division_name;
};


configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE   
);


service /address\-check on new http:Listener(9090) {

    resource function get address_by_id(string Id) returns address[]|error{
        address[] addresses = [];
        stream<address, error?> resultStream = dbClient->query(`select * from Address where Address_id=${Id}`);
        check from address address in resultStream
            do {
                addresses.push(address);
            };
        check resultStream.close();
        return addresses;
    }

    resource function get address_by_gramaniladari(string Id, int address_id) returns error|boolean {
    int[] addresses = [];
    stream<record {| int address; |}, error?> resultStream = checkpanic dbClient->query(`SELECT Address_id as address FROM address where division_id ${Id};`);
    check from record {| int address; |}? result in resultStream
    do {
        if (result is record {| int address; |}) {
            addresses.push(result.address);
        }
    };
    check resultStream.close();
    return addresses.indexOf(address_id) !== -1 ? true : false;
    }


}
