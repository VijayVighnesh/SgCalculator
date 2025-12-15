document.addEventListener('DOMContentLoaded', () => {
    // Calculator Toggling
    const showSgpaBtn = document.getElementById('show-sgpa');
    const showCgpaBtn = document.getElementById('show-cgpa');
    const sgpaCalculator = document.getElementById('sgpa-calculator');
    const cgpaCalculator = document.getElementById('cgpa-calculator');

    showSgpaBtn.addEventListener('click', () => {
        sgpaCalculator.style.display = 'block';
        cgpaCalculator.style.display = 'none';
        showSgpaBtn.classList.add('active');
        showCgpaBtn.classList.remove('active');
    });

    showCgpaBtn.addEventListener('click', () => {
        cgpaCalculator.style.display = 'block';
        sgpaCalculator.style.display = 'none';
        showCgpaBtn.classList.add('active');
        showSgpaBtn.classList.remove('active');
    });

    // SGPA Calculator Logic
    const addCourseBtn = document.getElementById('add-course');
    const calculateSgpaBtn = document.getElementById('calculate-sgpa');
    const clearSgpaBtn = document.getElementById('clear-sgpa');
    const courseList = document.getElementById('course-list');
    const sgpaValue = document.getElementById('sgpa-value');

    addCourseBtn.addEventListener('click', () => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <input type="text" class="course-name" placeholder="Course Name (e.g., CS101)">
            <input type="number" class="course-credits" placeholder="Credits">
            <select class="course-grade" title="Select Grade">
                <option value="">Grade</option>
                <option value="10">S</option>
                <option value="9">A</option>
                <option value="8">B</option>
                <option value="7">C</option>
                <option value="6">D</option>
                <option value="5">E</option>
                <option value="4">P</option>
                <option value="0">F</option>
            </select>
            <button class="remove-course" onclick="removeCourse(this)">Remove</button>
        `;
        courseList.appendChild(courseItem);
    });

    calculateSgpaBtn.addEventListener('click', () => {
        const courses = document.querySelectorAll('.course-item');
        let totalCredits = 0;
        let weightedSum = 0;

        courses.forEach((course) => {
            const credits = parseFloat(course.querySelector('.course-credits').value);
            const grade = parseFloat(course.querySelector('.course-grade').value);

            if (!isNaN(credits) && !isNaN(grade) && credits > 0) {
                totalCredits += credits;
                weightedSum += credits * grade;
            }
        });

        const sgpa = totalCredits > 0 ? weightedSum / totalCredits : 0;
        sgpaValue.textContent = sgpa.toFixed(2);
    });

    clearSgpaBtn.addEventListener('click', () => {
        const courses = document.querySelectorAll('.course-item');
        courses.forEach((course, index) => {
            if (index > 0) {
                course.remove();
            } else {
                course.querySelector('.course-name').value = '';
                course.querySelector('.course-credits').value = '';
                course.querySelector('.course-grade').value = '';
            }
        });
        sgpaValue.textContent = '0.00';
    });

    // CGPA Calculator Logic
    const addSemesterBtn = document.getElementById('add-semester');
    const calculateCgpaBtn = document.getElementById('calculate-cgpa');
    const clearCgpaBtn = document.getElementById('clear-cgpa');
    const semesterList = document.getElementById('semester-list');
    const cgpaValue = document.getElementById('cgpa-value');

    addSemesterBtn.addEventListener('click', () => {
        const semesterItem = document.createElement('div');
        semesterItem.className = 'semester-item';
        semesterItem.innerHTML = `
            <input type="number" class="semester-sgpa" placeholder="Semester SGPA">
            <input type="number" class="semester-credits" placeholder="Total Semester Credits">
            <button class="remove-semester" onclick="removeSemester(this)">Remove</button>
        `;
        semesterList.appendChild(semesterItem);
    });

    calculateCgpaBtn.addEventListener('click', () => {
        const semesterItems = document.querySelectorAll('.semester-item');
        let totalCreditPoints = 0;
        let totalCredits = 0;

        semesterItems.forEach(item => {
            const sgpa = parseFloat(item.querySelector('.semester-sgpa').value);
            const credits = parseFloat(item.querySelector('.semester-credits').value);

            if (!isNaN(sgpa) && !isNaN(credits) && sgpa >= 0 && sgpa <= 10 && credits > 0) {
                totalCreditPoints += sgpa * credits;
                totalCredits += credits;
            }
        });

        if (totalCredits > 0) {
            const cgpa = totalCreditPoints / totalCredits;
            cgpaValue.textContent = cgpa.toFixed(2);
        } else {
            cgpaValue.textContent = '0.00';
        }
    });

    clearCgpaBtn.addEventListener('click', () => {
        const semesterItems = document.querySelectorAll('.semester-item');
        semesterItems.forEach((item, index) => {
            if (index === 0) {
                item.querySelector('.semester-sgpa').value = '';
                item.querySelector('.semester-credits').value = '';
            } else {
                item.remove();
            }
        });
        cgpaValue.textContent = '0.00';
    });
});

// Remove a course item
function removeCourse(button) {
    if (document.querySelectorAll('.course-item').length > 1) {
        button.parentElement.remove();
    }
}

// Remove a semester item
function removeSemester(button) {
    if (document.querySelectorAll('.semester-item').length > 1) {
        button.parentElement.remove();
    }
}