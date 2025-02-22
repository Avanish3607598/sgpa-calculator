

let verifier=0
let gradepointarr = []
let creditarr = []
let sr = 1;
let name, marks, maxmarks, grade, gradepoint, credit;
let add = document.getElementById('add');
add.addEventListener('click', () => {
 
    name = document.getElementById("subs").value;
    marks = parseInt(document.getElementById('omarks').value);
    maxmarks = parseInt(document.getElementById('mmarks').value);
    credit = parseInt(document.getElementById("credit").value)
    if (name === "")
        alert("Subject name can't be empty")
    else
        if (isNaN(credit) || credit === "")
            alert("Credit can't be empty")
        else if (credit <= 0)
            alert("credit can't be zero or negative")
        else
            if (isNaN(maxmarks) || maxmarks === "") {
                alert("Maximum marks can't be empty")

            }
            else if (maxmarks <= 0) {
                alert("Maximum  marks can't be negative or zero")
                document.getElementById('mmarks').value = ''

            }
            else if (isNaN(marks) || marks === "")
                alert("Obtained marks can't be empty")
            else if (marks < 0) {
                alert("Obtained marks can't be negative")
                document.getElementById('omarks').value = ''

            }
            else {

                if (marks > maxmarks) {
                    alert("Obtained marks can't be greater than total marks")
                    marks = 0
                    maxmarks = 0
                    document.getElementById('omarks').value = ''
                    document.getElementById('mmarks').value = ''
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

                let tableBody = document.getElementById("tablebody")

                let newRow = document.createElement("tr")
                newRow.innerHTML = `
            <td>${sr}</td>
             <td>${name}</td>
              <td>${marks}</td> 
              <td>${maxmarks}</td> 
              <td>${credit}</td>
              <td>${gradepoint}</td>
              <td>${grade}</td> 
            
            
            `;
                tableBody.appendChild(newRow)
                sr++;
                alert(`${name} added succesfully`)
                verifier=1



                document.getElementById('subs').value = ''
                document.getElementById('credit').value = ''
                document.getElementById('omarks').value = ''
            }




})

let res = document.getElementById("calc")

res.addEventListener('click', () => {
    if(verifier==1){

   
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
    showres.innerHTML = `Your SGPA = ${sgpa}`
   // document.getElementById("cont").appendChild(showres)

    verifier=0;
 }
 else alert(`First insert data`)
})


