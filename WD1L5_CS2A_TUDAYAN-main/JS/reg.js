//1. User Details, Concatenate, Save to localStorage

function saveUserDetails() {
    let first_name = document.getElementById("fname").value;
    let last_name = document.getElementById("lname").value;
    let address = document.getElementById("address").value;
    let user_name = document.getElementById("uname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pword").value;

    //make sure that all blanks are filled
    //HTML tag  INPUT "required"
    //OR make our own remarks


    if (first_name === "" || last_name === "" || address === "" || user_name === "" || email === "" || password === ""){
        document.getElementById("regMessage").innerHTML = "<h1 style = 'color:red'>Please fill all the details</h1>";
        return;
    }

    //String Concatenate all details

let userDetails = first_name + " | " + last_name + " | " +
                  address + " | " + user_name + " | " +
                  email + " | " + password;


    //save to localstorage (to store setItem/ to receive getItem)
localStorage.setItem("userRecord", userDetails);

document.getElementById("regMessage").innerHTML = "<h3 style='color:green'>User Details Saved</h3>";

alert(localStorage.getItem("userRecord"));


//Move to next page
window.location.href = "login.html";
}

