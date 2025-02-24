

let verifier = 0
let gradepointarr = []
let creditarr = []
let sr = 1;
let name, marks, maxmarks, grade, gradepoint, credit;
let add = document.getElementById('add');
add.addEventListener('click', () => {

    name = document.getElementById("subs").value;
    marks = parseInt(document.getElementById('omarks').value);

    credit = parseInt(document.getElementById("credit").value)
    if (name === "") {
        alert("Subject name can't be empty")

        return
    }

    if (isNaN(marks) || marks === "") {
        alert("Obtained marks can't be empty")
        return
    }

    if (isNaN(credit) || credit === "") {
        alert("Credit can't be empty")
        return
    }

    if (marks < 0) {
        alert("Obtained marks can't be negative")
        document.getElementById('omarks').value = ''
        return
    }

    if (marks > 100) {
        alert("Obtained marks can't be greater than 100")
        marks = 0
        maxmarks = 0
        document.getElementById('omarks').value = ''
        return
    }

    if (credit < 0) {
        alert("credit can't be negative")
        document.getElementById('credit').value = ''
        return
    }






    creditarr.push(credit)
    gradepoint = Math.floor(marks / 10) + 1;
    if (gradepoint <= 4) gradepoint = 0
    gradepointarr.push(gradepoint)

    gradepoint
    switch (gradepoint) {
        case 10:
            grade = 'S'
            break
        case 9:
            grade = 'A'
            break
        case 8:
            grade = 'B'
            break
        case 7:
            grade = 'C'
            break
        case 6:
            grade = 'D'
            break
        case 5:
            grade = 'E'
            break

        default:
            grade = 'F'

    }
    let table = document.getElementById("ptable")
    table.classList.remove("toggler")
    let tableBody = document.getElementById("tablebody")
    let newRow = document.createElement("tr")
    newRow.classList.add("storeclass")

    if (gradepoint > 8)
        newRow.classList.add("greenclass")
    else if (gradepoint > 6 && gradepoint <= 8)
        newRow.classList.add("yellowclass")
    else
        newRow.classList.add("redclass")
    newRow.innerHTML = `
            <td>${sr}</td>
             <td>${name}</td>
              <td>${marks}/100</td> 
            
              <td>${credit}</td>
              <td>${gradepoint}</td>
              <td>${grade}</td> 
            
            
            `;
    tableBody.appendChild(newRow)
    sr++;
    alert(`${name} added succesfully`)
    verifier = 1



    document.getElementById('subs').value = ''
    document.getElementById('credit').value = ''
    document.getElementById('omarks').value = ''

    document.getElementById("subs").classList.remove("input_accept")
    document.getElementById("omarks").classList.remove("input_accept")
    document.getElementById("credit").classList.remove("input_accept")

    let sumofcredit = creditarr.reduce((res, el) => res + el)
    console.log(sumofcredit)
    let sumcreditgradearr = creditarr.map((value, i) => value * gradepointarr[i])
    console.log(sumcreditgradearr)
    let sumcreditgrade = sumcreditgradearr.reduce((res, el) => res + el)
    console.log(sumcreditgrade)
    let sgpa = sumcreditgrade / sumofcredit;
    console.log(sgpa)

    let showres = document.getElementById('sgpaid')
    if (sgpa >= 8)
        showres.className = "greenclass"
    else if (sgpa > 6 && sgpa < 8)
        showres.className = "yellowclass"

    else showres.className = "redclass"
    showres.innerHTML = `SGPA = ${sgpa.toFixed(1)}`
    add.innerHTML=`Add Anohter Subject`

})




document.getElementById("omarks").addEventListener("change", () => {
    let m = parseInt(document.getElementById("omarks").value)
    if (m <= 100 && m >= 0) {
        document.getElementById("omarks").classList.add("input_accept")
        document.getElementById("omarks").classList.remove("input_reject")

    }
    else {
        document.getElementById("omarks").classList.add("input_reject")
        document.getElementById("omarks").classList.remove("input_accept")

    }

})

document.getElementById("credit").addEventListener("change", () => {
    let m = parseInt(document.getElementById("credit").value)
    if (m >= 0) {
        document.getElementById("credit").classList.add("input_accept")
        document.getElementById("credit").classList.remove("input_reject")

    }
    else {
        document.getElementById("credit").classList.add("input_reject")
        document.getElementById("credit").classList.remove("input_accept")

    }

})

document.getElementById("subs").addEventListener("change", () => {
    let m = parseInt(document.getElementById("subs").value)
    if (m === '') {
        document.getElementById("subs").classList.add("input_reject")
        document.getElementById("subs").classList.remove("input_accept")

    }
    else {
        document.getElementById("subs").classList.add("input_accept")
        document.getElementById("subs").classList.remove("input_rejectt")

    }

})

document.getElementById("clear").addEventListener('click', () => {
    verifier = 0
    gradepointarr.length = 0
    creditarr.length = 0
    sr = 1;
    document.querySelectorAll(".storeclass").forEach(el => el.remove())
    document.getElementById("ptable").classList.add("toggler")
    document.getElementById('subs').value = ''
    document.getElementById('credit').value = ''
    document.getElementById('omarks').value = ''
    document.getElementById("subs").classList.remove("input_accept")
    document.getElementById("omarks").classList.remove("input_accept")
    document.getElementById("credit").classList.remove("input_accept")

   

    document.getElementById('add').innerHTML=`Add Subject`


})