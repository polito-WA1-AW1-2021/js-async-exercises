'use strict';

// Exam constructor
function Exam (code, name, credits, score) {
  this.code = code;
  this.courseName = name;
  this.credits = credits;
  this.score = score;
};

// transform Italian grades into U.S. ones
const remap = (score) => {
  if(score >= 27) return 'A';
  else if (score >= 24) return 'B';
  else if (score >= 19) return 'C';
  else return 'D';
}

// init -- my exams
const exams = [];
const aw1 = new Exam('01xx', 'Web Applications I', 6, 27);
const softeng = new Exam('02xx', 'Software Engineering', 6, 30);
const dsp = new Exam('03abc', 'Distributed Systems Programming', 10, 20);
exams.push(aw1, softeng, dsp);

// create the same list of Exams, but with US scores
const usExams = exams.map(({score, ...e}) => ({...e, score: remap(score)}));

// convert scores to 1-4, to compute GPA
const usScores = usExams.map(e => e.score);
// this can be done in a similar way to remap()
const four = usScores.filter(score => score === 'A').map(score => score = 4);
const three = usScores.filter(score => score === 'B').map(score => score = 3);
const two = usScores.filter(score => score === 'C').map(score => score = 2);
const one = usScores.filter(score => score === 'D').map(score => score = 1);

// compute GPA
const gpa = [...four, ...three, ...two, ...one].reduce((sum, score) => sum + score, 0)/usScores.length;

// print everything
console.log('My exams:');
console.log(exams);
console.log('My exams with US scores:');
console.log(usExams);
console.log(`GPA: ${gpa}`);