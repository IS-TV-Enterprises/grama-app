import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _; // This bundles the driver to the project so that you don't need to bundle it via the `Ballerina.toml` file.
import ballerina/sql;
import ballerina/http;

public type crime record {|
    int crime_id;
    @sql:Column { name: "Id" }
    string NIC;
    @sql:Column { name: "crime_description" }
    string description;
    time:Date date;
|};

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE);



service /police\-check on new http:Listener(9090) {

    resource function get crimes_by_id(string Id) returns crime[]|error{
        crime[] crimes = [];
        stream<crime, error?> resultStream = dbClient->query(`select * from crimes where ID=${Id}`);
        check from crime crime in resultStream
            do {
                crimes.push(crime);
            };
        check resultStream.close();
        return crimes;
    }

    resource function get crime_check_by_id(string Id) returns int|error{
        sql:ParameterizedQuery query = `SELECT EXISTS(SELECT 1 FROM crimes WHERE id=${Id}) AS result;`;
        int police_check = check dbClient->queryRow(query);
        return police_check;
    }

}
