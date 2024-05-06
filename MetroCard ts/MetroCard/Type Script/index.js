"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CardNoAutoIncrement = 1000;
let TravelIDAutoIncrement = 2000;
let TicketIDAutoIncrement = 3000;
let CurrentLoggedInUser;
function newUser() {
    let signupPage = document.getElementById("signupPage");
    let homepage = document.getElementById("welcomepage");
    homepage.style.display = "none";
    signupPage.style.display = "block";
}
function signUp() {
    let userEmail = document.getElementById("userEmail").value;
    let userName = document.getElementById("userName").value;
    let userPassword = document.getElementById("userPassword").value;
    let userNumber = document.getElementById("userPhoneNumber").value;
    let signupUser = {
        cardNumber: -1,
        userEmail: userEmail,
        userPassword: userPassword,
        userBalance: 0,
        userName: userName,
        phoneNumber: Number(userNumber)
    };
    addUserDetails(signupUser);
    showHomePage();
}
function showHomePage() {
    let signupPage = document.getElementById("signupPage");
    let homepage = document.getElementById("welcomepage");
    let loginPage = document.getElementById("loginPage");
    let balancePage = document.getElementById("balancePage");
    let menuPage = document.getElementById("menuPage");
    let travelPage = document.getElementById("travelHistoryPage");
    let travellingPage = document.getElementById("travelPage");
    travellingPage.style.display = "none";
    travelPage.style.display = "none";
    menuPage.style.display = "none";
    balancePage.style.display = "none";
    loginPage.style.display = "none";
    signupPage.style.display = "none";
    homepage.style.display = "block";
}
function login() {
    let loginPage = document.getElementById("loginPage");
    let homepage = document.getElementById("welcomepage");
    homepage.style.display = "none";
    loginPage.style.display = "block";
}
function checkPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        let userEmail = document.getElementById("userLoginEmail").value;
        let userPassword = document.getElementById("userLoginPassword").value;
        let flag = true;
        const checkpass = yield fetchUserDetails();
        for (let i = 0; i < checkpass.length; i++) {
            if (checkpass[i].userEmail == userEmail && checkpass[i].userPassword == userPassword) {
                flag = false;
                CurrentLoggedInUser = checkpass[i];
                menu();
            }
        }
        if (flag == true) {
            alert("Wrong Password");
        }
    });
}
function menu() {
    let welcome = document.getElementById("welcomeUser");
    let menuPage = document.getElementById("menuPage");
    let loginPage = document.getElementById("loginPage");
    let rechargePage = document.getElementById("rechargePage");
    let balancePage = document.getElementById("balancePage");
    let travelPage = document.getElementById("travelHistoryPage");
    let travellingPage = document.getElementById("travelPage");
    welcome.innerHTML = "Hi " + CurrentLoggedInUser.userName;
    travellingPage.style.display = "none";
    travelPage.style.display = "none";
    balancePage.style.display = "none";
    rechargePage.style.display = "none";
    loginPage.style.display = "none";
    menuPage.style.display = "block";
}
function balanceCheck() {
    let menuPage = document.getElementById("menuPage");
    let balancePage = document.getElementById("balancePage");
    let amount = document.getElementById("balanceAmount");
    amount.innerHTML = CurrentLoggedInUser.userBalance.toString();
    menuPage.style.display = "none";
    balancePage.style.display = "block";
}
function rechargeAmount() {
    let amount = document.getElementById("rechargeAmount").value;
    CurrentLoggedInUser.userBalance += +amount;
    alert("Amount is Added to your wallet Successfully");
    menu();
}
function recharge() {
    let balancePage = document.getElementById("balancePage");
    let rechargePage = document.getElementById("rechargePage");
    let menuPage = document.getElementById("menuPage");
    menuPage.style.display = "none";
    balancePage.style.display = "none";
    rechargePage.style.display = "block";
}
function travel() {
    return __awaiter(this, void 0, void 0, function* () {
        let travelPage = document.getElementById("travelPage");
        let menuPage = document.getElementById("menuPage");
        let fair = document.getElementById("travelFair");
        fair.innerHTML = "";
        fair.innerHTML = `<tr><td>From Location</td>
                        <td>To Location</td>
                        <td>Fair</td>
                        <td>Book Ticket</td></tr>`;
        let ticket = yield fetchTicketDetail();
        for (let i = 0; i < ticket.length; i++) {
            let fair = document.getElementById("travelFair");
            fair.innerHTML += `<tr>
                            <td>${ticket[i].fromLocation}</td>
                            <td>${ticket[i].tolocation}</td>
                            <td>${ticket[i].price}</td>
                            <td>
                            <button onclick="buyTicket(${ticket[i].ticketID})"> Buy Ticket</button></td>
                            </tr>`;
        }
        menuPage.style.display = "none";
        travelPage.style.display = "block";
    });
}
function buyTicket(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = false;
        let travelcost = 0;
        let ticket = yield fetchTravelDetail();
        for (let i = 0; i < ticket.length; i++) {
            if (ticket[i].travelID == ticketID && ticket[i].travelCost <= CurrentLoggedInUser.userBalance) {
                flag = true;
                travelcost += ticket[i].travelCost;
                CurrentLoggedInUser.userBalance -= ticket[i].travelCost;
                let userticket = {
                    travelID: ticketID,
                    cardNumber: ticket[i].cardNumber,
                    fromLocation: ticket[i].fromLocation,
                    toLoaction: ticket[i].toLoaction,
                    date: ticket[i].date,
                    travelCost: ticket[i].travelCost
                };
                addTravel(userticket);
                alert("Ticket is Booked");
                menu();
            }
        }
        if (flag == false) {
            alert("Insufficent Balance!...Please Recharge");
        }
    });
}
function travelHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let travelPage = document.getElementById("travelHistoryPage");
        let travelTable = document.getElementById("travelTable");
        let menuPage = document.getElementById("menuPage");
        let travelHistory = yield fetchTravelDetail();
        travelTable.innerHTML = "";
        travelTable.innerHTML = `<tr>
                            <td>Travel ID</td>
                            <td>Card Number</td>
                            <td>From Location</td>
                            <td>tolocation</td>
                            <td>date</td>
                            <td>Travel Cost</td></tr>`;
        let flag = true;
        for (let i = 0; i < travelHistory.length; i++) {
            let fair = document.getElementById("travelFair");
            fair.innerHTML += `<tr>
                          <td>${travelHistory[i].travelID}</td>
                          <td>${travelHistory[i].cardNumber}</td>
                          <td>${travelHistory[i].fromLocation}</td>
                          <td>${travelHistory[i].toLoaction}</td>
                          <td>${travelHistory[i].date}</td>
                          <td>${travelHistory[i].travelCost}</td>
                          </tr>`;
        }
        travelPage.style.display = "block";
        menuPage.style.display = "none";
    });
}
function fetchUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://localhost:5166/api/UserDetails`;
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Users');
        }
        return yield response.json();
    });
}
function fetchTicketDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5166/api/Ticketdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Users');
        }
        return yield response.json();
    });
}
function fetchTravelDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5166/api/TravelDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Users');
        }
        return yield response.json();
    });
}
function addUserDetails(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5166/api/UserDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function addTicketDetail(ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5166/api/TicketDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error('Failed to add ticket');
        }
    });
}
function addTravel(travel) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5166/api/TravelDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(travel)
        });
        if (!response.ok) {
            throw new Error('Failed to add Travel');
        }
    });
}
