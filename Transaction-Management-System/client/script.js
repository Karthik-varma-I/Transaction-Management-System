function toggle_signin() {
    document.getElementById("create-account").style.display = "none";
    document.getElementById("sign-in").style.display = "block";
    document.getElementById("admin-login").style.display = "none";
}

function toggle_createaccount() {
    document.getElementById("create-account").style.display = "block";
    document.getElementById("sign-in").style.display = "none";
    document.getElementById("admin-login").style.display ="none"
}

function toggle_adminlogin() {
    document.getElementById("admin-login").style.display = "block";
    document.getElementById("sign-in").style.display = "none";
    document.getElementById("create-account").style.display = "none";
}

var createUser = (event) => {
    event.preventDefault();
   if(valid("create")) {
    let data = {
        "email" : document.getElementById("create-email").value,
        "password" : document.getElementById("create-password").value
    }
        fetch("http://localhost:8888/api/createaccount", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data)
        })
        .then((res) => {
            if(res.status == 201){
                alert("Created successfully signin for further process");
                clearForm("create");
                toggle_signin();
            }
            else if(res.status == 400)
                alert("User already exist");
        })
        .catch((err) => {
            console.log(err);
        });
   } else {
        document.getElementById("create-errmsg").innerText = "*Invalid Email*";
   }
}

var authenticateUser = (event, mode) => {
    event.preventDefault();
    if(valid(mode)) {
        let data = {
            "email" : document.getElementById(`${mode}-email`).value,
            "password" : document.getElementById(`${mode}-password`).value
        }
            fetch(`http://localhost:8888/api/${mode}`, {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(data)
            })
            .then((res) => {
                if(res.status == 400) {
                    document.getElementById(`${mode}-errmsg`).innerText = "*Invalid Credintials*";
                } else if(res.ok && res.status == 200) {
                    document.getElementById(`${mode}-errmsg`).innerText = "";
                    sessionStorage.setItem("emailid", data.email);
                    clearForm(mode);
                    let page = (mode == "admin") ? "admin.html" : "user.html";
                    window.location.href = page;
                }
                return res.json();
            }).then((res) => {
                sessionStorage.setItem("token-trans", res["token"]);
            })
            .catch((err) => {
                console.log(err);
                document.getElementById("signin-errmsg").innerText = "*Invalid Credintials*";
            });
    } else {
        document.getElementById("signin-errmsg").innerText = "*Invalid Email*";
    }
}

function valid(mode) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = document.getElementById(`${mode}-email`).value;
    return emailRegex.test(email);
}

function clearForm(mode) {
    document.getElementById(`${mode}-email`).value  = "";
    document.getElementById(`${mode}-password`).value = "";
}