## Moscord Coding Exam

### Assignments

#### A: RSS Reader

The goal of this assignment is to retrieve news in the RSS format from a remote server and display the contents to a user. It must be solved in node.js.

Implement a view of a RSS news feed, where at least these following fields can be read:

* Title
* Publication date
* Link to each news item in the feed, so that clicking the link will take the end-user to that external news page
* Make the RSS URL editable, so that the end-user is able to change it
* Provide a sort option for the end-user

##### B: Promise

Make your own ‘Promise’ in Node.js, without use of dependencies.

Implement a validate-function, that fulfills the userstory below:
 - The function should return a validation number that is calculated by adding all digits in the input.

- If the result of this sum has more than a single digit, another iteration is required, repeat the process until a single digit number is calculated.

- Example: for the input "444444" the sum of all the digits is 24. Since this is not a single-digit number, 2 and 4 should be added, and the result, 6, is the validation number that the validate function should return.


##### How to run #A

```
yarn install
yarn start
```

##### How to run #B

Browse it at `http://localhost:3000/task-b/:number`

```
curl http://localhost:3000/task-b/444444
```

will return

```json
{ "history": ["444444", 24, 6], "result": 6 }
```

Meaning, it goes to the process of summation of its sum which called **history** and the validation is called **result**.

##### To run unit test for promise and summation script

```
yarn test
```