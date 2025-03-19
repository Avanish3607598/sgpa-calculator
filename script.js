let verifier = 0;
let gradepointarr = [];
let creditarr = [];
let entries = []; 
let sr = 0;

let add = document.getElementById("add");
add.addEventListener("click", () => {
    let name = document.getElementById("subs").value;
    let marks = parseInt(document.getElementById("omarks").value);
    let credit = parseInt(document.getElementById("credit").value);

    if (name === "") {
        alert("Subject name can't be empty");
        return;
    }

    if (isNaN(marks) || marks === "") {
        alert("Obtained marks can't be empty");
        return;
    }

    if (isNaN(credit) || credit === "") {
        alert("Credit can't be empty");
        return;
    }

    if (marks < 0 || marks > 100) {
        alert("Marks should be between 0 and 100");
        document.getElementById("omarks").value = "";
        return;
    }

    if (credit < 0 || credit > 10) {
        alert("Credit should be between 0 and 10");
        document.getElementById("credit").value = "";
        return;
    }

    let gradepoint = Math.floor(marks / 10) + 1;
    if (gradepoint <= 4) gradepoint = 0;

    let grade;
    switch (gradepoint) {
        case 10: grade = "S"; break;
        case 9: grade = "A"; break;
        case 8: grade = "B"; break;
        case 7: grade = "C"; break;
        case 6: grade = "D"; break;
        case 5: grade = "E"; break;
        default: grade = "F";
    }

  
    let entry = { id: sr, credit, gradepoint };
    entries.push(entry);
    sr++;

    let table = document.getElementById("ptable");
    table.classList.remove("toggler");
    let tableBody = document.getElementById("tablebody");
    let newRow = document.createElement("tr");
    newRow.classList.add("storeclass");
    newRow.setAttribute("data-id", entry.id); 

    let button2 = document.createElement("button");
    button2.innerHTML = `Delete`;
    button2.classList.add("edit_button");

    button2.addEventListener("click", () => {
        deleteEntry(entry.id);
        newRow.remove();
    });

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${marks}/100</td> 
        <td>${credit}</td>
        <td>${gradepoint}</td>
        <td>${grade}</td> 
        <td></td>  
    `;
    newRow.lastElementChild.appendChild(button2);
    tableBody.appendChild(newRow);

    recalculateSGPA();

    document.getElementById("subs").value = "";
    document.getElementById("credit").value = "";
    document.getElementById("omarks").value = "";

    document.getElementById("subs").classList.remove("input_accept");
    document.getElementById("omarks").classList.remove("input_accept");
    document.getElementById("credit").classList.remove("input_accept");

    add.innerHTML = `Add Another Subject`;
});


function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id); 
    recalculateSGPA(); 
}


function recalculateSGPA() {
    if (entries.length === 0) {
        document.getElementById("sgpaid").innerHTML = `SGPA: 0`;
        document.getElementById("perid").innerHTML = `Percentage: 0`;
        return;
    }

    let sumofcredit = entries.reduce((res, el) => res + el.credit, 0);
    let sumcreditgrade = entries.reduce((res, el) => res + el.credit * el.gradepoint, 0);

    let sgpa = (sumcreditgrade / sumofcredit).toFixed(1);
    let percentage = 10 * sgpa - 4.5;

    document.getElementById("sgpaid").innerHTML = `SGPA: ${sgpa}`;
    document.getElementById("perid").innerHTML = `Percentage: ${percentage}`;
}


document.getElementById("omarks").addEventListener("change", () => {
    let m = parseInt(document.getElementById("omarks").value);
    let inputField = document.getElementById("omarks");

    if (m <= 100 && m >= 0) {
        inputField.classList.add("input_accept");
        inputField.classList.remove("input_reject");
    } else {
        inputField.classList.add("input_reject");
        inputField.classList.remove("input_accept");
    }
});

document.getElementById("credit").addEventListener("change", () => {
    let m = parseInt(document.getElementById("credit").value);
    let inputField = document.getElementById("credit");

    if (m >= 0) {
        inputField.classList.add("input_accept");
        inputField.classList.remove("input_reject");
    } else {
        inputField.classList.add("input_reject");
        inputField.classList.remove("input_accept");
    }
});

document.getElementById("subs").addEventListener("change", () => {
    let m = document.getElementById("subs").value.trim();
    let inputField = document.getElementById("subs");

    if (m === '') {
        inputField.classList.add("input_reject");
        inputField.classList.remove("input_accept");
    } else {
        inputField.classList.add("input_accept");
        inputField.classList.remove("input_reject");
    }
});


document.getElementById("clear").addEventListener("click", () => {
    verifier = 0;
    gradepointarr.length = 0;
    creditarr.length = 0;
    entries = [];
    sr = 0;

    document.querySelectorAll(".storeclass").forEach(el => el.remove());
    document.getElementById("ptable").classList.add("toggler");

    document.getElementById("subs").value = "";
    document.getElementById("credit").value = "";
    document.getElementById("omarks").value = "";

    document.getElementById("subs").classList.remove("input_accept");
    document.getElementById("omarks").classList.remove("input_accept");
    document.getElementById("credit").classList.remove("input_accept");

    document.getElementById("sgpaid").innerHTML = `SGPA: 0`;
    document.getElementById("perid").innerHTML = `Percentage: 0`;

    document.getElementById("add").innerHTML = `Add Subject`;
});
