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

function deductTenPercent(score, points) {
  score = score - points / 10;
  return score;
}

function getLearnerData(course, ag, submissions) {
  checkType(course);

  // here, we would process this data to achieve the desired result.
  console.log(course, "===course==========");
  console.log(ag, "======ag=======");
  console.log(submissions, "=====submission========");
  // the ID of the learner for which this data has been collected
  let tempResult = [];
  if (course.id !== ag.course_id) {
    throw Error("Assignment's Course Id does not match course id");
  } else {
    const learnerIdArr = [];
    let k = 0;
    while (k < submissions.length) {
      learnerIdArr.push(submissions[k].learner_id);
      k++;
    }
    console.log(learnerIdArr, "===learnerIdArr");

    //Used For loop, Continue and let variable, array
    let uniqueArray = [];
    for (let i = 0; i < learnerIdArr.length; i++) {
      if (uniqueArray.includes(learnerIdArr[i])) {
        continue;
      }
      uniqueArray.push(learnerIdArr[i]);
    }

    console.log(uniqueArray + "===uniqueArray");

    let tempObj = {};
    let sum = 0;
    let score = 0;
    let total = 0;
    let pointsPossible = 0;
    let assignment = 0;
    for (let j = 0; j < uniqueArray.length; j++) {
      for (let i = 0; i < submissions.length; i++) {
        assignment = ag.assignments.find(
          (a) => a.id === submissions[i].assignment_id
        );
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submissions[i].submission.submitted_at);
        console.log(dueDate + "    " + submittedDate);

        const isIdPresent = uniqueArray[j] === submissions[i].learner_id;
        if (isIdPresent && dueDate < new Date()) {
          tempObj.id = uniqueArray[j];
          console.log(assignment.id, " assignment id");
          try {
            if (assignment.points_possible === 0) {
              throw new Error("Divide by zero error");
            }
            score = submissions[i].submission.score;
            pointsPossible = assignment.points_possible;
            console.log(pointsPossible, "  points possible");
            if (dueDate < submittedDate) {
              score = deductTenPercent(score, pointsPossible);
            }
            tempObj[assignment.id] = (score / pointsPossible).toFixed(2);
          } catch (error) {
            console.error(error);
          }
          sum += score;

          // tempObj.sum = sum;
          console.log(sum, "  sum");
          console.log(tempObj.id);
          let pointsTotal = assignment.points_possible;

          total = total + pointsTotal;
          console.log(total, " points Total  ===");
          // tempObj.total = total;
          const avg = sum / total;
          tempObj.avg = avg;
        }
      }
      sum = 0;
      total = 0;
      score = 0;
      pointsPossible = 0;
      tempResult.push(tempObj);
      console.log(tempObj + "  Temp obj");
      tempObj = {};
    }
    tempResult.forEach((x) => console.log(x));
  }
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return tempResult;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

function checkType(course) {
  for (let i in course) {
    console.log(course[i]);
    const variable = course[i];
    switch (typeof variable) {
      case "string":
        console.log("Its a string");
        break;
      case "number":
        console.log("Its a number");
        break;
      case "boolean":
        console.log("Its a boolean");
        break;
      default:
        console.log("Unknown type.");
        throw Error("Invalid Data type");
    }
  }
}
