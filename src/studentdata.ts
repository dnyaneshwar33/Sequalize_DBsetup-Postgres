const students = [
  { name: "Alice", age: 20, grade: 75 },
  { name: "Bob", age: 22, grade: 85 },
  { name: "Charlie", age: 21, grade: 60 },
  { name: "David", age: 19, grade: 45 },
  { name: "Eve", age: 20, grade: 90 }
];

interface Student {
  name: string;
  age: number;
  grade: number;
}


function filterPassedStudents(studentsData: Student[]) {
  //  console.log(studentsData);
  return studentsData.filter(stud => stud.grade >= 50);
}

function getStudentNames(studentsData: Student[]) {
  return studentsData.map(stud => stud.name)
}

function sortStudentsByGrade(studentsData: Student[]) {
  const CopyData = studentsData.slice();
  return CopyData.sort((stud1, stud2) => stud1.grade - stud2.grade);
}

function getAverageAge(studentsData: Student[]) {
  let totalAge = 0;
  studentsData.forEach(stud => {
    totalAge += stud.age;
  });

  const AvgAge = totalAge / students.length;
  return AvgAge;
}


const filterPassedStudentsResult = filterPassedStudents(students);
console.log(filterPassedStudentsResult);

const getStudentNamesResult = getStudentNames(students);
console.log(getStudentNamesResult);

const sortStudentsByGradeResult = sortStudentsByGrade(students);
console.log(sortStudentsByGradeResult);

const getAverageAgeResult = getAverageAge(students)
console.log(getAverageAgeResult)