// Show the grade equivalent for every student.
function showGradeEquivalent() {
    // Student names and grades are stored in arrays.
    let students = ["Anna Reyes", "Ben Santos", "Carla Cruz", "David Lim", "Ella Ramos"];
    let grades = [92, 85, 78, 97, 74];

    let output = "<h2>Grade Equivalents</h2>";
    output += "<table>";
    output += "<tr><th>Student Name</th><th>Grade</th><th>Equivalent</th><th>Remark</th><th>Academic Leader</th></tr>";

    // Use a loop to evaluate each student.
    for (let i = 0; i < students.length; i++) {
        let equivalent = getEquivalent(grades[i]);
        let remark = getRemark(grades[i]);
        let leader = getAcademicLeader(equivalent);

        output += "<tr>";
        output += "<td>" + students[i] + "</td>";
        output += "<td>" + grades[i] + "</td>";
        output += "<td>" + equivalent + "</td>";
        output += "<td>" + remark + "</td>";
        output += "<td>" + leader + "</td>";
        output += "</tr>";
    }

    output += "</table>";

    // Display the result on the page.
    document.getElementById("result").innerHTML = output;
}

// Return Passed or Failed using a ternary operator.
function getRemark(grade) {
    let remark = grade >= 75 ? "Passed" : "Failed";
    return remark;
}

// Convert the numerical grade to its equivalent.
function getEquivalent(grade) {
    let equivalent = "";

    if (grade >= 97) {
        equivalent = "1.0";
    } else if (grade >= 94) {
        equivalent = "1.25";
    } else if (grade >= 91) {
        equivalent = "1.5";
    } else if (grade >= 88) {
        equivalent = "1.75";
    } else if (grade >= 85) {
        equivalent = "2.0";
    } else if (grade >= 82) {
        equivalent = "2.25";
    } else if (grade >= 79) {
        equivalent = "2.5";
    } else if (grade >= 76) {
        equivalent = "2.75";
    } else if (grade >= 75) {
        equivalent = "3.0";
    } else {
        equivalent = "Failed";
    }

    return equivalent;
}

// Identify the Academic Leader classification.
function getAcademicLeader(equivalent) {
    let leader = "";

    switch (equivalent) {
        case "1.0":
        case "1.25":
            leader = "1st Class Academic Leader";
            break;
        case "1.5":
            leader = "2nd Class Academic Leader";
            break;
        case "1.75":
            leader = "3rd Class Academic Leader";
            break;
        default:
            leader = "-";
    }

    return leader;
}
