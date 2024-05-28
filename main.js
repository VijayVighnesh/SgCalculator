// java script part

function calculategrade(grade, unit) {
  if (grade === 'S') {
    return 10 * unit;
  } else if (grade === "A") {
    return 9 * unit;
  } else if (grade === "B") {
    return 8 * unit;
  } else if (grade === "C") {
    return 7 * unit;
  } else if (grade === "D") {
    return 6 * unit;
  } else if (grade === "E") {
    return 5 * unit;
  } else if (grade === "P") {
    return 4 * unit;
  } else if (grade === "F") {
    return 0;
  }
}

let count = 0;

function addnewcourse() {
  count++;
  let newForm = document.createElement('form');
  newForm.classList.add(`addNew`,`get-${count}`);
  const courseName =`
  <form class="addNew, get-${count}" >
          <input
            type="text"
            placeholder="Enter course Name"
            class="courses get-${count}"
            required
          />
          <input
            type="int"
            placeholder="Enter course Credits"
            class="course-credits get-${count}"
            required
          />
          <select class="grade get-${count}">
            <option value="select" class="grade">Select</option>
            <option value="select" class="grade">S</option>
            <option value="select" class="grade">A</option>
            <option value="select" class="grade">B</option>
            <option value="select" class="grade">C</option>
            <option value="select" class="grade">D</option>
            <option value="select" class="grade">E</option>
            <option value="select" class="grade">P</option>
            <option value="select" class="grade">F</option>
          </select>
        </form>
        `
 newForm.innerHTML = courseName
 document.querySelector('.course-div1').appendChild(newForm);
}

function removeForms(){
   let maniForm = document.querySelector('.addNew');
   maniForm.remove();
}

const reports = [];

function gpacalc(){
   const RESULTBAR = document.getElementById('result');
   const GRADESELECT = document.querySelectorAll('select.grade');
   const UNIT = document.querySelectorAll('input.course-credits');

   const courseReports = {};

   const Listofunits = [];
   const listofgrades = [];
  
   let totalUnits = 0;

   GRADESELECT.forEach((e) =>{
     let GRADES = e.options;
     const selectedIndex = e.selectedIndex;
     const selectedGrade = GRADES[selectedIndex];
     const gradeValue = selectedGrade.text.toUpperCase();
     listofgrades.push(gradeValue); 
   });

   UNIT.forEach((e)=>{
       const unitValue = parseInt(e.value);
       totalUnits += unitValue;
       Listofunits.push(unitValue);     
    });
    
    let totalEarnedUnits = 0;

    for(let i=0; i<Listofunits.length; i++){
      totalEarnedUnits += calculategrade(listofgrades[i], Listofunits[i]);
    }

    const gpa = totalEarnedUnits/totalUnits;

    if(gpa>=0){
      RESULTBAR.textContent = 'Your Sgpa is :-'+ gpa.toFixed(2);
    }else{
      RESULTBAR.textContent = 'Please Enter Correct Details';
    }
}