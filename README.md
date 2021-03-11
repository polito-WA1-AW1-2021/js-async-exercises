# JavaScript Exercises: Async and Functional

## My U.S. Scores

- Develop a JS program to convert the scores of your exams into the U.S. system
- Using the functional approach, you should manage a list of objects that includes the following information about the exams:
  - Course Code, Course Name, CFU, Score (a number between 18 and 30)
- Create a new list with the same information but the scores according the U.S. system, where:
  - 27+ -> A, 24-26 -> B, 19-23 -> C, 18 -> D
- Then, compute the weighted average, considering A as 4.0 and D as 1.0
- Print all your scores (in both formats), and the computed average

A possible solution: [`us-scores.js`](us-scores.js)

## Courses and Scores, in a Database

- Update the "Courses and Scores" exercise to use a database.
- Manage a list of objects and related DB tables that include information about the exams:
  - Course Code, Course name, CFU
  - Attained score (number between 18 and 30, plus a Boolean for the laude)
  - Date
- The list of Exam objects, named ExamList, will have the following methods, operating on the DB, which return Promises:
  - `add(exam)` // pass a fully-constructed Exam object
  - `getAll()` // returns (a Promise that resolves to) an ExamList with all the Exams
  - `find(courseCode)` // returns (a Promise that resolves to) the matching Exam
  - `afterDate(date)` // returns (a Promise that resolves to) an ExamList with the subset of Exams after the given date
  - `getWorst(num)` // returns (a Promise that resolves to) an ExamList with the num Exams with the lowest score

A possible solution: [`transcript-db.js`](transcript-db.js)
