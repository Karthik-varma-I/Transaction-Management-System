var email, amount_field, transaction_count_field, last_updated_field, main_table, all_btn, success_btn, failed_btn, basic_url;
var amount_input = document.getElementById("amount");
// var status_input = document.getElementById("status");
var paymentMethod_input = document.getElementById("payment-method"); 

window.onload = () => {
    email = sessionStorage.getItem("emailid");
    amount_field = document.getElementById("amount-field");
    transaction_count_field = document.getElementById("Transaction-count");
    last_updated_field = document.getElementById("last-updated-field");
    main_table = document.getElementById("main-table");
    all_btn = document.getElementById("all-btn");
    success_btn = document.getElementById("success-btn");
    failed_btn = document.getElementById("failed-btn");
    pending_btn = document.getElementById("pending-btn");
    basic_url = "http://localhost:8888/api";
    document.getElementById("welcome-head").innerHTML =  
    `Welocme back <br>${email.split('@')[0]}!!`;
    document.getElementById("user-email-field").innerText = email;
    let now = new Date();
    last_updated_field.innerText = `Last Updated : ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    updateCards();
    handleBtn('all');
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

function updateCards() {
    fetch(basic_url + `/totalamount/${email}`)
    .then((res) => res.json())
    .then((res) => {
        if(res["result"].length > 0) {
            amount_field.innerText = "$" + res["result"][0]["totalAmount"];
            transaction_count_field.innerText = `Total Transactions : ${res["result"][0]["count"]} (success)`;
        } else {
            amount_field.innerText = "$0";
            transaction_count_field.innerText = `Total Transactions : 0`;
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

function handleBtn(mode) {
    clearBtnStyle(mode)
    if(mode == "success") {
        handleModeBtn(`/transactions/${email}/success`);
    } else if(mode == "failed") {
        handleModeBtn(`/transactions/${email}/failed`);
    } else if(mode == "pending"){
        handleModeBtn(`/transactions/${email}/pending`);
    } else {
        handleModeBtn(`/transactions/${email}`);
    }
}

function handleModeBtn(url) {
    fetch(basic_url + url)
    .then((res) => res.json())
    .then((res) => {
        createTableHead();
        
        res["result"].forEach((transaction) => {
            main_table.innerHTML += ` <tr>
                <td>${transaction.transaction_id}</td>
                <td>$${transaction.amount}</td>
                <td>${formateDate(transaction.transaction_date)}</td>
                <td>${capitalizeFirstLetter(transaction.status)}</td>
                <td>${capitalizeFirstLetter(transaction.payment_method)}</td>
            </tr>`
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

function createTableHead() {
    main_table.innerHTML =`
            <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment Method</th>
            </tr>`
}

function clearBtnStyle(mode) {
    all_btn.style.border = "";
    success_btn.style.border = "";
    failed_btn.style.border = "";
    pending_btn.style.border = "";
    if(mode == 'success') {
        success_btn.style.border = "2px solid rgb(160, 159, 159)";
    } else if(mode == 'failed') {
        failed_btn.style.border = "2px solid rgb(160, 159, 159)";
    } else if(mode == 'pending') {
        pending_btn.style.border = "2px solid rgb(160, 159, 159)";
    } else {
        all_btn.style.border = "2px solid rgb(160, 159, 159)";
    }
}

document.getElementById("create-div").onclick = dispForm;
document.getElementById("cancel-btn").onclick = hideForm;
document.getElementById("confirm-btn").onclick = handleConfirmBtn;
function dispForm() {
    document.getElementById("payment-container").style.display = "flex";
    document.getElementById("payment-container").scrollIntoView({ behavior: "smooth" });
}

function hideForm() {
    document.getElementById("payment-container").style.display = "none";
}

function handleConfirmBtn() {
    if(amount_input.value) {
        let data = {
            transaction_id : generateUniqueId(),
            customer_id : email,
            amount : amount_input.value,
            status: "pending",
            payment_method: paymentMethod_input.value,
            currency : "Dollar"
        }
        fetch(basic_url + '/createtransaction', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'authorization' : sessionStorage.getItem("token-trans")
            },
            body : JSON.stringify(data)
        })
        .then((res) => {
            if(res.ok && res.status == 201)
                alert("Transaction Pending\nMessage: Admin has to accept");
            clearForm();
            hideForm();
            handleBtn("all");
            updateCards();
        })
        .catch((err) => {
            alert("Server side error");
            console.log(err);
        });
    } else {
        alert('Fill all the fields');
    }
}

function clearForm() {
    amount_input.value = "";
    // status_input.value = "success";
    paymentMethod_input.value = "credit-card";
}

function generateUniqueId() {
    return 'Tran-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}