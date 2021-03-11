'use strict';

// import dayjs and sqlite3
const dayjs = require('dayjs');
const sqlite = require('sqlite3');

// the Exam object
function Exam(code, name, credits, date, score, laude=false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.score = score;
  this.laude = laude;
  this.date = dayjs(date);

  this.toString = () => { 
    return `Code: ${this.code}, Course: ${this.name}, CFU: ${this.credits}, Grade: ${this.laude ? this.score + 'L' : this.score}, Date: ${this.date.format('YYYY-MM-DD')}`;
   };

};

// the ExamList, with its methods
function ExamList() {
  const db = new sqlite.Database('exams.sqlite', (err) => { if (err) throw err; });

  this.add = (exam) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO score(coursecode, score, laude, datepassed) VALUES (?, ?, ?, DATE(?))';
      db.run(sql, [exam.code, exam.score, exam.laude, exam.date.format('YYYY-MM-DD')], function(err) {
        if (err)
          reject(err); 
        else {
          resolve(this.lastID);
        }    
      });
    });
  };

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM course JOIN score ON course.code=score.coursecode' ;
      db.all(sql, [], (err, rows) => {
        if(err)
          reject(err);
        else {
          const exams = rows.map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, ((row.laude) ? true : false)));
          resolve(exams);
        }
      });            
    });
  };

  this.find = (code) => {
    const sql = 'SELECT * FROM course JOIN score ON course.code=score.coursecode WHERE score.coursecode=?';
    db.get(sql, [code], (err, row) => {
      if (err)
        reject(err);
      else
        resolve(new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, ((row.laude) ? true : false)))
    });
  };

  this.afterDate = (date) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM course JOIN score ON course.code=score.coursecode WHERE score.datepassed > ?' ;
      db.all(sql, [date], (err, rows) => {
        if(err)
          reject(err);
        else {
          const exams = rows.map(row => new Exam(row.code, row.name, row.CFU, row.datepassed, row.score, ((row.laude) ? true : false)));
          resolve(exams);
        }
      });            
    });
  };

  /* ALTERNATIVE
  this.afterDate = async (date) => {
    const exams = await this.getAll();
    return exams.filter(course => course.date.isAfter(date));
  }; */

  this.getWorst = async (num) => {
    const exams = await this.getAll();
    return exams.sort((a,b) => a.score - b.score).splice(0, num);
  };

};

/* TESTING */
const main = async () => {
  const examList = new ExamList();
  
  // creating a few Exams
  const wa1 = new Exam('01TXYOV', 'Web Applications I', 6, '2021-06-01', 30, true);
  const sec = new Exam('01TYMOV', 'Information systems security', 6, '2021-06-10', 22);
  const ds = new Exam('01SQJOV', 'Data Science and Database Technology', 8, '2021-07-02', 28);
  const myNewExams = [wa1, sec, ds];

  // calling some methods -- insert the 3 new exams
  myNewExams.forEach(async (exam) => {
    try {
      const result = await examList.add(exam);
      console.log(`'${exam.name}' inserted!`)
    } catch (err) {
      console.error(err);
    }
  });

  // get all the Exams
  const exams = await examList.getAll();
  console.log(`${exams}`);

  // get the 2 worst Exams
  const worstExams = await examList.getWorst(2);
  console.log('Worst 2 exams: ' + worstExams);
}

main();