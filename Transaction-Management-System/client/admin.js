
function toggleDetails(userId) {
    const details = document.getElementById(`details-${userId}`);
    const isVisible = details.style.display === 'table';
    document.querySelectorAll('.user-details').forEach(detail => {
        detail.style.display = 'none';
    });
    details.style.display = isVisible ? 'none' : 'table';
}

var users_div = document.getElementById("user-list");
var basic_url = "http://localhost:8888/api";
var amount_input = document.getElementById("amount");
var status_input = document.getElementById("status");
var paymentMethod_input = document.getElementById("payment-method"); 
var date_input = document.getElementById("tran-date");
var notification_container = document.getElementById("notification-container");
var notification_icon = document.getElementById("notification-icon");
document.getElementById("cancel-btn").onclick = hideForm;
document.getElementById("confirm-btn").onclick = validateForm;
window.onload = () => {
    fetch(basic_url + "/getusers", {
        method : "GET",
        headers : {
                'Content-Type' : 'application/json',
                'authorization' : sessionStorage.getItem("token-trans")
        }
    })
    .then((res) => {
        if(res.ok && res.status == 200) {
            return res.json();
        }
    })
    .then((res) => {
        createUserBars(res["result"]);
    })
    .catch((err) => {
        console.log(err);
    })
    createNotifications();
};



document.addEventListener('click', function(event) {
    if(!notification_icon.contains(event.target) && !notification_container.contains(event.target)) {
        notification_container.style.transform = "translateX(500px)";
    }
});

notification_icon.addEventListener('click', function(event) {
        notification_container.style.display = "inline-block";
        notification_container.style.transform = "translateX(0px)";
});

function createUserBars(data) {
    // console.log(data);
    
    data.forEach((user) => {
        users_div.innerHTML += `
        <div id="userdiv-${user.email.replace(/[@.]/g, '_')}" class="user-bar" onclick="toggleDetails('${user.email.replace(/[@.]/g, '_')}')">
            <span class="user-name">${user.email}</span>
            <i onclick="deleteUser('${user.email}')" title="Delete User" class="fa-solid fa-trash-can delete-user-btn"></i>
        </div>
         <table class="user-details" id="details-${user.email.replace(/[@.]/g, '_')}">
            <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment Method</th>
            </tr></table>
        `;
        createUserDetails(user.email);
    });
}

function addUserDetails(user, id) {
    
    let user_table = document.getElementById(id);
    
    user.forEach((transaction) => {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr-" + transaction.transaction_id);
        tr.innerHTML = createTableRow(transaction)
        user_table.appendChild(tr);
    })
}

function createTableRow(transaction) {
    return `    <td>${transaction.transaction_id}</td>
                <td>$${transaction.amount}</td>
                <td>${formateDate(transaction.transaction_date)}</td>
                <td>${capitalizeFirstLetter(transaction.status)}</td>
                <td>${capitalizeFirstLetter(transaction.payment_method)}</td>
                <td title="Edit" onclick="editTransaction('${transaction.transaction_id}')" class="table-btns-edit"><i class="fa-regular fa-pen-to-square"></i></td>
                <td title="Delete" onclick="deleteTransaction('${transaction.transaction_id}')" class="table-btns-delete"><i class="fa-solid fa-trash"></i></td>
            `;
}

function editTransaction(id) {
    dispForm(id);
    fetch(basic_url + `/gettransaction/${id}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            'authorization' : sessionStorage.getItem("token-trans")
        }
    })
    .then((res) => {
        if(res.ok && res.status == 200) {
            return res.json();
        }
    })
    .then((res) => {
        fillForm(res["result"][0]);
    })
    .catch((err) => {
        console.log(err);
    })
}

function fillForm(data) {
    // console.log(data);
    
    amount_input.value = data.amount;
    date_input.value = getDateFromString1(data.transaction_date);
    status_input.value = data.status;
    paymentMethod_input.value = data.payment_method;
}

function validateForm() {
    if(amount_input.value && date_input.value && status_input.value && paymentMethod_input.value) {
        let tid = document.getElementById("tran-head-div").innerText;
        let data = {
            "amount" : amount_input.value,
            "transaction_date" : date_input.value,
            "status" : status_input.value,
            "payment_method" : paymentMethod_input.value
        }
        // console.log(data);
        fetch(basic_url + `/updatetransactions/${tid}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                'authorization' : sessionStorage.getItem("token-trans")
            },
            body : JSON.stringify(data)
        })
        .then((res) => {
            if(res.ok && res.status == 200) {
                alert("Updated Successfully");
            }
        })
        .catch((err) => {
            console.log(err);
        });
        updateRow(tid, data);
        hideForm();
    } else {
        alert('Fill all the fields');
    }
}

function updateRow(tid, data) {
    data["transaction_id"] = tid;
    let tr = document.getElementById("tr-" + tid);
    tr.innerHTML = createTableRow(data);
}

function getDateFromString1(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function deleteTransaction(id) { 
    fetch(basic_url + `/deletetransactions/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            'authorization' : sessionStorage.getItem("token-trans")
        }
    })
    .then((res) => {
        if(res.ok && res.status == 200) {
            alert("Deleted Successfully");
            document.getElementById("tr-" + id).style.display = "none";
        }
    })
    .catch((err) => {
        console.log(err);
        alert("Server Side Error");
    })
}

function createUserDetails(email) {
    fetch(basic_url + `/transactions/${email}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            'authorization' : sessionStorage.getItem("token-trans")
        }
    })
        .then((res) => {
            if(res.ok && res.status == 200) {
                return res.json();
            }
        })
        .then((res) => {
            // console.log(res);
            // console.log(email);
            
            addUserDetails(res["result"], `details-${email.replace(/[@.]/g, '_')}`);
        })
        .catch((err) => {
            console.log(err);
        })
}

function deleteUser(email) {
    fetch(basic_url + `/deleteuser/${email}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            'authorization' : sessionStorage.getItem("token-trans")
        }
    })
    .then((res) => {
        if(res.ok && res.status == 200) {
            alert(`${email} deleted successsfully`);
        }
        removeUserBar(`userdiv-${email.replace(/[@.]/g, '_')}`, `details-${email.replace(/[@.]/g, '_')}`);
    })
    .catch((err) => {
        console.log(err);
    })
}

function removeUserBar(id1, id2) {
    document.getElementById(id1).style.display = "none";
    document.getElementById(id2).style.display = "none";
}

function formateDate(str) {
    let date = new Date(str);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function capitalizeFirstLetter(string) {
    if (!string) 
        return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function dispForm(id) {
    document.getElementById("payment-container").style.display = "flex";
    document.getElementById("tran-head-div").innerText = id;
    document.getElementById("payment-container").scrollIntoView({ behavior: "smooth" });
}

function hideForm() {
    document.getElementById("payment-container").style.display = "none";
    clearForm();
}

function clearForm() {
    amount_input.value = "";
    status_input.value = "success";
    date_input.value = "dd-mm-yyyy";
    paymentMethod_input.value = "credit-card";
}

function createNotification(data) {
    return `<div id="notification-${data.transaction_id}" class="notification">
            <div class="user-name">${capitalizeFirstLetter(data.customer_id.split("@")[0])} (<span class="user-email">${data.customer_id}</span>)</div>
            <div class="content">Amount of <span class="amount">$${data.amount}</span> via <span class="payment-method">${capitalizeFirstLetter(data.payment_method)}</span></div>
            <div class="btns">
                <button onclick="handleStatus('${data.transaction_id}', 'success')" class="correct-btn"><i class="fa-solid fa-check"></i></button>
                <button onclick="handleStatus('${data.transaction_id}', 'failed')" class="wrng-btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>`
}

function createNotifications() {
    fetch(basic_url + '/notifications',{
        method : "GET",
        headers : {
                'Content-Type' : 'application/json',
                'authorization' : sessionStorage.getItem("token-trans")
        }
    })
    .then((res) => res.json())
    .then((res) => {
        // console.log(res);
        
        res["result"].forEach((data) => {
            document.getElementById("notification-container").innerHTML += createNotification(data);
        });
    })
    .catch((err) => console.log(err));
}
function handleStatus(transaction_id, status) {
    // console.log(transaction_id, status);
    
    fetch(basic_url + `/updatestatus/${transaction_id}/${status}`, {
        method : "PUT",
        headers : {
                'Content-Type' : 'application/json',
                'authorization' : sessionStorage.getItem("token-trans")
        }
    })
    .then((res) => {
        if(res.ok && res.status == 200) {
            let msg = (status == 'success') ? 'Accepted' : 'Rejected';
            alert(`${msg} the transaction`);
            clearBlock(`notification-${transaction_id}`);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function clearBlock(id) {
    document.getElementById(id).style.display = "none";
}