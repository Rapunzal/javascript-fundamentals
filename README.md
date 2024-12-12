# SBA 308:JavaScript Fundamentals

## Objectives

- Employ basic JavaScript syntax accurately.
- Implement control flow structures such as conditionals and loops effectively.
- Use arrays and objects to organize and manage data.
- Develop functions to create reusable code.
- Utilize loops and iteration to navigate through data collections.
- Implement error handling to manage potential code failures gracefully.

## Technology Used

- JAVASCRIPT
- HTML

## What the project does

The project consist of a script getLearnerData that gathers data, processes it, and then outputs a consistent result as specified.It accepts input as courseInfo, AssignmentGroup and LearnerSubmission.The output of the script is Learners profile in an assignment within a course.

- Result consist an array of all learner as objects inside an array:
  - Each learner object consist of
    - Learner Id
    - Learners weighted average
    - Percentage learner scored on each assignment

## Why the project is useful

The getLearnerData project helps in keeping track of the
performance of Learners by calculating the weighted average
and individual performance of learners in each assignment. It aslo
considers the due date and submission date while calculating the result.

## How users can get started with the project

- User can get started by calling getLearnerData function and providing inputs as fallows in
  the same order.
- User should provide parameters as first should be Course Info, then AssignmentGroup and lastly LearnerSubmission.
- Then user should execute the function.
- This function returns the result as specified in preceeding section.

* const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) \*
  console.log(result);

## Output

![alt text](image.png)

## Input

This is the input that needs to be provided to the program.

// The provided course information.
const CourseInfo = {
id: 451,
name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
id: 12345,
name: "Fundamentals of JavaScript",
course_id: 451,
group_weight: 25,
assignments: [
{
id: 1,
name: "Declare a Variable",
due_at: "2023-01-25",
points_possible: 50,
},
{
id: 2,
name: "Write a Function",
due_at: "2023-02-27",
points_possible: 150,
},
{
id: 3,
name: "Code the World",
due_at: "3156-11-15",
points_possible: 500,
},
],
};

// The provided learner submission data.
const LearnerSubmissions = [
{
learner_id: 125,
assignment_id: 1,
submission: {
submitted_at: "2023-01-25",
score: 47,
},
},
{
learner_id: 125,
assignment_id: 2,
submission: {
submitted_at: "2023-02-12",
score: 150,
},
},
{
learner_id: 125,
assignment_id: 3,
submission: {
submitted_at: "2023-01-25",
score: 400,
},
},
{
learner_id: 132,
assignment_id: 1,
submission: {
submitted_at: "2023-01-24",
score: 39,
},
},
{
learner_id: 132,
assignment_id: 2,
submission: {
submitted_at: "2023-03-07",
score: 140,
},
},
];
