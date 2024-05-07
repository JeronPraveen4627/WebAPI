let CardNoAutoIncrement = 1000;
let TravelIDAutoIncrement = 2000;
let TicketIDAutoIncrement = 3000;
let CurrentLoggedInUser: UserDetails;

interface UserDetails {
  cardNumber: number
  userEmail: string
  userPassword: string;
  userBalance: number;
  userName: string;
  phoneNumber: string;
}

interface TravelDetails {
  travelID: number;
  cardNumber: number;
  fromLocation: string
  toLocation: string;
  date: string;
  travelCost: number;
}

interface TicketDetails {
  ticketID: number;
  fromLocation: string;
  toLocation: string;
  price: number;
}



function newUser() {
  let signupPage = document.getElementById("signupPage") as HTMLDivElement;
  let homepage = document.getElementById("welcomepage") as HTMLDivElement;

  homepage.style.display = "none";
  signupPage.style.display = "block";
}

function signUp() {
  let userEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
  let userName = (document.getElementById("userName") as HTMLInputElement).value;
  let userPassword = (document.getElementById("userPassword") as HTMLInputElement).value;
  let userNumber = (document.getElementById("userPhoneNumber") as HTMLInputElement).value;

  let signupUser: UserDetails =
  {
    cardNumber: 0,
    userEmail: userEmail,
    userPassword: userPassword,
    userBalance: 0,
    userName: userName,
    phoneNumber: (userNumber)
  };
  addUserDetails(signupUser);
  showHomePage();
}

function showHomePage() {
  let signupPage = document.getElementById("signupPage") as HTMLDivElement;
  let homepage = document.getElementById("welcomepage") as HTMLDivElement;
  let loginPage = document.getElementById("loginPage") as HTMLDivElement;
  let balancePage = document.getElementById("balancePage") as HTMLDivElement;
  let menuPage = document.getElementById("menuPage") as HTMLDivElement;
  let travelPage = document.getElementById("travelHistoryPage") as HTMLDivElement;
  let travellingPage = document.getElementById("travelPage") as HTMLDivElement;

  travellingPage.style.display = "none";
  travelPage.style.display = "none";
  menuPage.style.display = "none";
  balancePage.style.display = "none";
  loginPage.style.display = "none";
  signupPage.style.display = "none";
  homepage.style.display = "block";

}
function login() {
  let loginPage = document.getElementById("loginPage") as HTMLDivElement;
  let homepage = document.getElementById("welcomepage") as HTMLDivElement;

  homepage.style.display = "none";
  loginPage.style.display = "block";
}

async function checkPassword() {
  let userEmail = (document.getElementById("userLoginEmail") as HTMLInputElement).value;
  let userPassword = (document.getElementById("userLoginPassword") as HTMLInputElement).value;
  let flag: boolean = true;
  const checkpass = await fetchUserDetails();
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

}



function menu() {
  let welcome = document.getElementById("welcomeUser") as HTMLLabelElement;
  let menuPage = document.getElementById("menuPage") as HTMLDivElement;
  let loginPage = document.getElementById("loginPage") as HTMLDivElement;
  let rechargePage = document.getElementById("rechargePage") as HTMLDivElement;
  let balancePage = document.getElementById("balancePage") as HTMLDivElement;
  let travelPage = document.getElementById("travelHistoryPage") as HTMLDivElement;
  let travellingPage = document.getElementById("travelPage") as HTMLDivElement;
  welcome.innerHTML = "Hi " + CurrentLoggedInUser.userName;

  travellingPage.style.display = "none";
  travelPage.style.display = "none";
  balancePage.style.display = "none";
  rechargePage.style.display = "none";
  loginPage.style.display = "none";
  menuPage.style.display = "block";
}

function balanceCheck() {
  let menuPage = document.getElementById("menuPage") as HTMLDivElement;
  let balancePage = document.getElementById("balancePage") as HTMLDivElement;
  let amount = document.getElementById("balanceAmount") as HTMLLabelElement;
  let rechargePage = document.getElementById("rechargePage") as HTMLDivElement;
  let travelPage = document.getElementById("travelHistoryPage") as HTMLDivElement;
  let travellPage = document.getElementById("travelPage") as HTMLDivElement;
  amount.innerHTML = CurrentLoggedInUser.userBalance.toString();

  travellPage.style.display = "none";
  travelPage.style.display = "none";
  rechargePage.style.display = "none";
  menuPage.style.display = "block";
  balancePage.style.display = "block";
}

function rechargeAmount() {
  let amount = (document.getElementById("rechargeAmount") as HTMLInputElement).value;
  CurrentLoggedInUser.userBalance += +amount;
  alert("Amount is Added to your wallet Successfully");
  recharge()

}

function recharge() {
  let balancePage = document.getElementById("balancePage") as HTMLDivElement;
  let rechargePage = document.getElementById("rechargePage") as HTMLDivElement;
  let menuPage = document.getElementById("menuPage") as HTMLDivElement;
  let amount = document.getElementById("balanceAmount") as HTMLLabelElement;
  let travelPage = document.getElementById("travelHistoryPage") as HTMLDivElement;
  let travellPage = document.getElementById("travelPage") as HTMLDivElement;
  amount.innerHTML = CurrentLoggedInUser.userBalance.toString();

  travellPage.style.display = "none";
  travelPage.style.display = "none";
  menuPage.style.display = "block";
  balancePage.style.display = "block";
  rechargePage.style.display = "block"

}

async function travel() {
  let travelPage = document.getElementById("travelPage") as HTMLDivElement;
  let menuPage = document.getElementById("menuPage") as HTMLDivElement;
  let balancePage = document.getElementById("balancePage") as HTMLDivElement;
  let rechargePage = document.getElementById("rechargePage") as HTMLDivElement;
  let fair = document.getElementById("travelFair") as HTMLTableElement;
  let travelHistoryPage = document.getElementById("travelHistoryPage") as HTMLDivElement;
  fair.innerHTML = "";
  fair.innerHTML = `<tr><td>From Location</td>
                        <td>To Location</td>
                        <td>Fair</td>
                        <td>Book Ticket</td></tr>`


  let ticket = await fetchTicketDetail()

  for (let i = 0; i < ticket.length; i++) {
    let fair = document.getElementById("travelFair") as HTMLTableElement;
    fair.innerHTML += `<tr>
                            <td>${ticket[i].fromLocation}</td>
                            <td>${ticket[i].toLocation}</td>
                            <td>${ticket[i].price}</td>
                            <td>
                            <button onclick="buyTicket(${ticket[i].ticketID})" class="buybutton"> Buy Ticket</button></td>
                            </tr>`
  }
  travelHistoryPage.style.display = "none";
  balancePage.style.display = "none";
  rechargePage.style.display = "none"
  menuPage.style.display = "block";
  travelPage.style.display = "block";
}

async function buyTicket(ticketID: number) {
  let flag: boolean = false;
  let travelcost: number = 0;
  let ticket = await fetchTravelDetail()
  for (let i = 0; i < ticket.length; i++) {
    if (ticket[i].travelID == ticketID && ticket[i].travelCost <= CurrentLoggedInUser.userBalance) {
      flag = true;
      travelcost += ticket[i].travelCost;
      CurrentLoggedInUser.userBalance -= ticket[i].travelCost;

      let userticket: TravelDetails =
      {
        travelID: 0,
        cardNumber: CurrentLoggedInUser.cardNumber,
        fromLocation: ticket[i].fromLocation,
        toLocation: ticket[i].toLocation,
        date: ticket[i].date.toString().substring(0,10),
        travelCost: ticket[i].travelCost
        // split('T')[0].split('-').reverse().join('/')
      };
      addTravel(userticket);
      alert("Ticket is Booked")
      menu()
    }
    // 
  }
  if (flag == false) {
    alert("Insufficent Balance!...Please Recharge")
  }

}


async function travelHistory() {
  let travelHistory = await fetchTravelDetail();
  let travelPage = document.getElementById("travelHistoryPage") as HTMLDivElement;
  let travellPage = document.getElementById("travelPage") as HTMLDivElement;
  let travelTable = document.getElementById("travelTable") as HTMLTableElement;
  let menuPage = document.getElementById("menuPage") as HTMLDivElement;
  let balancePage = document.getElementById("balancePage") as HTMLDivElement;
  let rechargePage = document.getElementById("rechargePage") as HTMLDivElement;

  travelTable.innerHTML = "";
  travelTable.innerHTML = `<tr>
                            <td>Travel ID</td>
                            <td>Card Number</td>
                            <td>From Location</td>
                            <td>To Location</td>
                            <td>Date</td>
                            <td>Travel Cost</td></tr>`
  let flag: boolean = true;
  for (let i = 0; i < travelHistory.length; i++) {

    if (travelHistory[i].cardNumber == CurrentLoggedInUser.cardNumber) {
      travelTable.innerHTML += `<tr>
                          <td>${travelHistory[i].travelID}</td>
                          <td>${travelHistory[i].cardNumber}</td>
                          <td>${travelHistory[i].fromLocation}</td>
                          <td>${travelHistory[i].toLocation}</td>
                          <td>${travelHistory[i].date.toString().substring(0,10)}</td>
                          <td>${travelHistory[i].travelCost}</td>
                          </tr>`
    }
  }
  rechargePage.style.display = "none"
  balancePage.style.display = "none"
  travellPage.style.display = "none"
  travelPage.style.display = "block"
  menuPage.style.display = "block"

}


async function fetchUserDetails(): Promise<UserDetails[]> {
  const apiUrl = `http://localhost:5166/api/UserDetails`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Users');
  }
  return await response.json();
}

async function fetchTicketDetail(): Promise<TicketDetails[]> {
  const apiUrl = 'http://localhost:5166/api/Ticketdetails';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Users');
  }
  return await response.json();
}
async function fetchTravelDetail(): Promise<TravelDetails[]> {
  const apiUrl = 'http://localhost:5166/api/TravelDetails';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Users');
  }
  return await response.json();
}

async function addUserDetails(user: UserDetails): Promise<void> {
  const response = await fetch(`http://localhost:5166/api/UserDetails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('Failed to add contact');
  }
  alert("SignUp successful");
}
async function addTicketDetail(ticket: TicketDetails): Promise<void> {
  const response = await fetch('http://localhost:5166/api/TicketDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });
  if (!response.ok) {
    throw new Error('Failed to add ticket');
  }

}

async function addTravel(travel: TravelDetails): Promise<void> {
  const response = await fetch('http://localhost:5166/api/TravelDetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(travel)
  });
  if (!response.ok) {
    throw new Error('Failed to add Travel');
  }

}




