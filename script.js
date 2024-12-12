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

function getUniqueLearnerId(learnerIdArr) {
  const uniqueArray = [];
  for (let i = 0; i < learnerIdArr.length; i++) {
    if (uniqueArray.includes(learnerIdArr[i])) {
      continue;
    }
    uniqueArray.push(learnerIdArr[i]);
  }
  return uniqueArray;
}

function getAssignment(ag, assignmentId) {
  for (let i = 0; i < ag.assignments.length; i++) {
    if (ag.assignments[i].id == assignmentId) {
      return ag.assignments[i];
    } else {
      continue;
    }
  }
}

function checkNumber(uniqueArray) {
  for (let i of uniqueArray) {
    if (typeof i === "number") {
      break;
    } else {
      throw Error("Number expected but " + typeof i + " found.");
    }
  }
}

function calculateAvgForEachAssignmentId(score, pointsPossible) {
  return (score / pointsPossible).toFixed(2);
}
function getLearnerData(course, ag, submissions) {
  checkType(course);

  // here, we would process this data to achieve the desired result.
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

    let uniqueArray = getUniqueLearnerId(learnerIdArr);
    checkNumber(uniqueArray);
    console.log(uniqueArray + "===uniqueArray");

    let tempObj = {};
    let sum = 0;
    let score = 0;
    let total = 0;
    let pointsPossible = 0;
    let assignment = 0;
    for (let j = 0; j < uniqueArray.length; j++) {
      sum = 0;
      total = 0;
      score = 0;
      pointsPossible = 0;
      tempObj = {};
      for (let i = 0; i < submissions.length; i++) {
        // assignment = ag.assignments.find(
        //   (a) => a.id === submissions[i].assignment_id
        // );
        let dueDate, submittedDate;
        let learnerSubmissions = submissions[i];
        const isIdPresent = uniqueArray[j] === learnerSubmissions.learner_id;
        if (isIdPresent) {
          assignment = getAssignment(ag, learnerSubmissions.assignment_id);
          dueDate = new Date(assignment.due_at);
          submittedDate = new Date(learnerSubmissions.submission.submitted_at);
          //console.log(dueDate + "    " + submittedDate);
        }
        if (isIdPresent && dueDate < new Date()) {
          tempObj.id = uniqueArray[j];
          try {
            if (assignment.points_possible === 0) {
              throw new Error("Divide by zero error");
            }
            score = learnerSubmissions.submission.score;
            pointsPossible = assignment.points_possible;
            // console.log(pointsPossible, "  points possible");
            if (dueDate < submittedDate) {
              score = deductTenPercent(score, pointsPossible);
            }
            tempObj[assignment.id] = calculateAvgForEachAssignmentId(
              score,
              pointsPossible
            );
          } catch (error) {
            console.error(error);
          }
          sum += score;
          tempObj.sum = sum;
          let pointsTotal = assignment.points_possible;

          total = total + pointsTotal;
          tempObj.total = total;
          const avg = sum / total;
          tempObj.avg = avg;
        }
      }

      tempResult.push(tempObj);
      //console.log(tempObj + "  Temp obj");
    }
    tempResult.forEach((x) => {
      delete x.sum;
      delete x.total;
    });
  }
  //   const result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0, // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833, // late: (140 - 15) / 150
  //     },
  //   ];

  return tempResult;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
try {
  if (result !== 0) {
    console.log(result);
  }
} catch (error) {
  console.log(error);
}

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
