document.addEventListener("DOMContentLoaded", () => {
  const addSemesterBtn = document.getElementById("add-semester");
  const calculateCgpaBtn = document.getElementById("calculate-cgpa");
  const clearBtn = document.getElementById("clear");
  const semesterList = document.getElementById("semester-list");
  const cgpaValue = document.getElementById("cgpa-value");

  const createSemesterItem = () => {
    const div = document.createElement("div");
    div.className = "semester-item";
    div.innerHTML = `
            <input type="number" class="semester-sgpa" placeholder="Semester SGPA">
            <input type="number" class="semester-credits" placeholder="Total Semester Credits">
            <button class="remove-semester" onclick="removeSemester(this)">Remove</button>
        `;
    semesterList.appendChild(div);
  };

  addSemesterBtn.addEventListener("click", createSemesterItem);

  calculateCgpaBtn.addEventListener("click", () => {
    const semesterItems = document.querySelectorAll(".semester-item");
    let totalCreditPoints = 0;
    let totalCredits = 0;

    semesterItems.forEach((item) => {
      const sgpaInput = item.querySelector(".semester-sgpa");
      const creditsInput = item.querySelector(".semester-credits");

      const sgpa = parseFloat(sgpaInput.value);
      const credits = parseFloat(creditsInput.value);

      if (
        !isNaN(sgpa) &&
        !isNaN(credits) &&
        sgpa >= 0 &&
        sgpa <= 10 &&
        credits > 0
      ) {
        totalCreditPoints += sgpa * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      const cgpa = totalCreditPoints / totalCredits;
      cgpaValue.textContent = cgpa.toFixed(2);
    } else {
      cgpaValue.textContent = "0.00";
    }
  });

  clearBtn.addEventListener("click", () => {
    const semesterItems = document.querySelectorAll(".semester-item");
    semesterItems.forEach((item, index) => {
      if (index === 0) {
        item.querySelector(".semester-sgpa").value = "";
        item.querySelector(".semester-credits").value = "";
      } else {
        item.remove();
      }
    });
    cgpaValue.textContent = "0.00";
  });
});

function removeSemester(button) {
  if (document.querySelectorAll(".semester-item").length > 1) {
    button.parentElement.remove();
  } else {
    alert("At least one semester must be present.");
  }
}
