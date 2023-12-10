import ballerinax/mysql;
import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/http;

// -- Insert data into Division table
// INSERT INTO Division (division_id, division_name) VALUES
// (1, 'Northern Division'),
// (2, 'Southern Division'),
// (3, 'Eastern Division');

// -- Insert data into GramaNiladari table
// INSERT INTO GramaNiladari (NIC, first_name, last_name, division_id) VALUES
// ('123456789012', 'John', 'Doe', 1),
// ('987654321098', 'Jane', 'Smith', 2),
// ('555555555555', 'Alice', 'Johnson', 3);

// -- Insert data into Address table
// INSERT INTO Address (Address_id, address_line1, address_line2, division_id) VALUES
// (101, '123 Main Street', 'Apt 4', 1),
// (102, '456 Oak Avenue', 'Unit B', 2),
// (103, '789 Pine Road', 'Suite 7', 3);

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
    stream<record {| int address; |}, error?> resultStream = checkpanic dbClient->query(`SELECT Address_id as address FROM address where division_id in (select division_id from gramaniladari where NIC = ${Id});`);
    check from record {| int address; |}? result in resultStream
    do {
        if (result is record {| int address; |}) {
            addresses.push(result.address);
        }
    };
    check resultStream.close();
    return addresses.indexOf(address_id) !== -1 ? true : false;
    }



    // resource function get division_by_NIC(string NIC) returns division|error{
    //     stream<division, error?> resultStream = dbClient->query(`select * from GramaNiladari where NIC=${NIC}`);
    //     check resultStream.hasNext();
    //     division division = check resultStream.next();
    //     check !resultStream.hasNext();
    //     check resultStream.close();
    //     return division;
    // }
}
