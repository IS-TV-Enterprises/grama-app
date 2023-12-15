
configurable string accountSId = ?;
configurable string authToken = ?;
configurable string fromNo = ?;

type MSG readonly & record {|
    string number;
    string message;
|};