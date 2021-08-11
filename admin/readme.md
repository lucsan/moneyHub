


new endpoint
Admin - localhost:8083
- `/investments/report` create csv report and post to Investments - localhost:8081`/investments/export`

I removed body-parser as this is deprecated and now handled by express. I removed request as this is now deprecated and replaced with vanilla nodejs http (I would have used https but the dev server wont handle it, and would given time, replace it with an http library, maybe Axios).

While I didn't implement Ramda, I did use three of the builtin functional functions in javascript, namely; map, filter and reduce.

tests are run via node (node tests.js)

1. How might you make this service more secure?
- Authentication, server security and possibly encryption of the data.

2. How would you make this solution scale to millions of records?
- backend server farm (say kubernetes), processing via AWS or Google lambda

3. What else would you have liked to improve given more time?
- I would have introduced a full testing suite, probably Jest, for the unit testing and integration tests. Potentially an exahastive test could been created for the value calculaion function. Converted report.js to a node module and used some typescript. Improved some function names. Lifted up hard coded values into a type or constant object.