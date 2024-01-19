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
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);


service /police\-check on new http:Listener(9090) {

    //get all crimes of a particular user 
    // Input : string ID
    //Output : list of crimes
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

    //check if a particular user has any crime records or not
    //Input : user ID
    //output : int (0/1) where 1 = has crime records & 0 = no crime records
    resource function get crime_check_by_id(string Id) returns int|error{
        sql:ParameterizedQuery query = `SELECT  count(*) as result from crimes where id=${Id}`;
        int records = check dbClient->queryRow(query);
        int police_check=0;
        if(records>0){
             police_check = 1;
        }
        return police_check;
    }
    

}