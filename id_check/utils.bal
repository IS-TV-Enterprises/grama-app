// import ballerina/time;
// import ballerina/log;
// import ballerina/sql;
// import ballerinax/mysql;

// type Candidate record {|
//     int id;
//     @sql:Column {name: "first_name"}
//     string firstName;
//     @sql:Column {name: "last_name"}
//     string lastName;
//     string? email;
//     string? phone;
//     time:Date dob;
// |};

// function selectCandidate(mysql:Client dbClient) returns error? {
//     int id = 134;
//     Candidate candidate = check dbClient->queryRow(`select * from candidates where id = ${id}`);
//     log:printInfo(candidate.toBalString());
// }

// function selectYoungestCandidates(mysql:Client dbClient) returns error? {
//     stream<Candidate, error?> candidates = dbClient->query(`select * from candidates order by dob DESC limit 5;`);
//     check from Candidate candidate in candidates
//         do {
//             log:printInfo(candidate.toBalString());
//         };

//     check candidates.close();
// }

// function insertCandidates(mysql:Client dbClient) returns error? {
//     Candidate[] candidates = [
//         {
//             id: -1,
//             firstName: "Peter",
//             lastName: "Stuart",
//             email: (),
//             phone: (),
//             dob: {
//                 year: 1993,
//                 month: 1,
//                 day: 10
//             }
//         },
//         {
//             id: -1,
//             firstName: "Stephanie",
//             lastName: "Mike",
//             email: (),
//             phone: (),
//             dob: {
//                 year: 1992,
//                 month: 2,
//                 day: 7
//             }
//         },
//         {
//             id: -1,
//             firstName: "Bill",
//             lastName: "Johns",
//             email: (),
//             phone: (),
//             dob: {
//                 year: 1998,
//                 month: 1,
//                 day: 10
//             }
//         }
//     ];

//     sql:ParameterizedQuery[] queries =
//         from Candidate candidate in candidates
//     select `insert into candidates (first_name, last_name, dob) values (${candidate.firstName}, ${candidate.lastName}, ${candidate.dob});`;

//     sql:ExecutionResult[] results = check dbClient->batchExecute(queries);

//     check from sql:ExecutionResult result in results
//         do {
//             log:printInfo(result.toBalString());
//         };

// }

// type ProcedureResult record {
//     int id;
//     @sql:Column {name: "first_name"}
//     string firstName;
//     @sql:Column {name: "last_name"}
//     string lastName;
//     string skill;
// };

// function getCandidateSkills(mysql:Client dbClient) returns error? {
//     sql:IntegerOutParameter intParam = new;
//     sql:ProcedureCallResult result = check dbClient->call(`CALL get_candidate_skill(133, ${intParam})`, [ProcedureResult]);

//     int count = check intParam.get(int);

//     stream<ProcedureResult, sql:Error?> skills = <stream<ProcedureResult, sql:Error?>> result.queryResult;
//     check from ProcedureResult skill in skills
//         do {
//             log:printInfo(skill.toBalString());
//         };
//     check result.close();
// }

// function insertAtomicTransaction(mysql:Client dbClient) returns error? {
//     string firstName = "John";
//     string lastName = "Doe";
//     sql:DateValue dob = new ("1990-01-04");
//     int skill = 10;

//     transaction {

//         sql:ParameterizedQuery candidateInsert = `INSERT INTO candidates (first_name,last_name, dob) VALUES (${firstName}, ${
//         lastName}, ${dob})`;
//         sql:ExecutionResult execResult = check dbClient->execute(candidateInsert);

//         int candidateId = <int>execResult.lastInsertId;
//         log:printInfo(string `Newly inserted Candidate Id : ${candidateId}`);

//         sql:ParameterizedQuery candidateSkillInsert = `INSERT INTO candidate_skills VALUES (${candidateId}, ${skill})`;
//         sql:ExecutionResult|sql:Error skillUpdateResult = dbClient->execute(candidateSkillInsert);

//         if (skillUpdateResult is sql:Error) {
//             log:printInfo("Rollback transaction");
//             rollback;
//         } else {
//             var commitResult = commit;
//             if commitResult is () {
//                 log:printInfo("Transaction committed");
//             } else {
//                 log:printInfo("Transaction failed");
//             }
//         }
//     }
// }
