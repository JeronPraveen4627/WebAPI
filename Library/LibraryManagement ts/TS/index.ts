let CurrentLoggedInUser: UserDetails;
let currentbook: BookDetails;
interface UserDetails {
  userID: any,
  userName: string,
  gender: string,
  department: string,
  mobileNumber: string,
  mailID: string,
  walletBalance: number,
  userPassword: string
}
interface BookDetails {
  bookID: any,
  bookName: string,
  authorName: string,
  bookCount: number
}
interface BorrowDetails {
  borrowID: any,
  bookID: number,
  userID: number,
  borrowedDate: Date,
  borrowBookCount: number,
  status: string,
  paidFineAmount: number
}

async function AddUser(user: UserDetails): Promise<void> {
  const response = await fetch('http://localhost:5277/api/UserDetails',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
}

async function AddBookAPI(book: BookDetails): Promise<void> {
  const response = await fetch('http://localhost:5277/api/BookDetails',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
  if (!response.ok) {
    throw new Error('Failed to add medicine');
  }
}


async function AddBorrowAPI(borrow: BorrowDetails): Promise<void> {
  const response = await fetch('http://localhost:5277/api/BorrowDetails',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(borrow)
    });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
}

async function updateUser(id: number, user: UserDetails): Promise<void> {
  const response = await fetch(`http://localhost:5277/api/UserDetails/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
}

async function updateBook(id: number, book: BookDetails): Promise<void> {
  const response = await fetch(`http://localhost:5277/api/BookDetails/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
}

async function updateBorrow(id: number, borrow: BorrowDetails): Promise<void> {
  const response = await fetch(`http://localhost:5277/api/BorrowDetails/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(borrow)
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
}

async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5277/api/UserDetails/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
}

async function deleteBookAPI(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5277/api/BookDetails/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete medicine');
  }
}


async function deleteBorrow(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5277/api/BorrowDetails/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
}


async function fetchUsers(): Promise<UserDetails[]> {
  const apiUrl = 'http://localhost:5277/api/UserDetails';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return await response.json();
}

async function fetchBook(): Promise<BookDetails[]> {
  const apiUrl = 'http://localhost:5277/api/BookDetails';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return await response.json();
}

async function fetchBorrow(): Promise<BorrowDetails[]> {
  const apiUrl = 'http://localhost:5277/api/BorrowDetails';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return await response.json();
}

function homepage() {
  let homepage = document.getElementById('homepage') as HTMLDivElement;
  let signup = document.getElementById('signuppage') as HTMLDivElement;
  let loginpage = document.getElementById("loginpage") as HTMLDivElement;

  loginpage.style.display = "none";
  signup.style.display = "none";
  homepage.style.display = "block";
}
function newUserPage() {
  let signup = document.getElementById('signuppage') as HTMLDivElement;
  let homepage = document.getElementById('homepage') as HTMLDivElement;
  let loginpage = document.getElementById("loginpage") as HTMLDivElement;

  loginpage.style.display = "none";
  homepage.style.display = "none";
  signup.style.display = "block";

}
function existingUserPage() {
  let loginpage = document.getElementById("loginpage") as HTMLDivElement;
  let homepage = document.getElementById('homepage') as HTMLDivElement;
  let signup = document.getElementById('signuppage') as HTMLDivElement;

  homepage.style.display = "none";
  signup.style.display = "none";
  loginpage.style.display = "block";

}


function signup() {
  let name = (document.getElementById("newuserName") as HTMLInputElement).value;
  let newuserEmail = (document.getElementById("newuserEmail") as HTMLInputElement).value;
  let newUserPassword = (document.getElementById("newuserPassword") as HTMLInputElement).value;
  let newgender = (document.getElementById("newgender") as HTMLInputElement).value;
  let newdepartment = (document.getElementById("newdepartment") as HTMLInputElement).value;
  let newmobile = (document.getElementById("newmobile") as HTMLInputElement).value;

  const user: UserDetails = {
    userID: undefined,
    userName: name,
    mailID: newuserEmail,
    userPassword: newUserPassword,
    mobileNumber: newmobile,
    gender: newgender,
    department: newdepartment,
    walletBalance: 0
  }
  alert("Registration Successful");
  AddUser(user);

}

async function login() {
  let existingUserMail = (document.getElementById("exsitingEmail") as HTMLInputElement).value;
  let existingUserPassword = (document.getElementById("exsitingPassword") as HTMLInputElement).value;
  let flag: boolean = false;

  const users = await fetchUsers()

  users.forEach(user => {
    if (user.mailID == existingUserMail && user.userPassword == existingUserPassword) {
      flag = true;
      CurrentLoggedInUser = user;
      menu();
    }
  });
  if (flag == false)
    alert("Invalid User Name or Password")
}

function menu() {
  let menupage = document.getElementById("menupage") as HTMLDivElement;
  menupage.style.display = 'block'
  let loginpage = document.getElementById("loginpage") as HTMLDivElement;
  loginpage.style.display = 'none'
  let rechargepage = document.getElementById("rechargepage") as HTMLDivElement;
  rechargepage.style.display = 'none'
  let balanceamountpage = document.getElementById("balanceamount") as HTMLDivElement;
  balanceamountpage.style.display = 'none'
  let returnpage = document.getElementById("returnpage") as HTMLDivElement;
  returnpage.style.display = "none";
  let borrowBookPage = document.getElementById("borrowBookPage") as HTMLDivElement;
  borrowBookPage.style.display = "none";
}

function rechargePage() {
  let rechargepage = document.getElementById("rechargepage") as HTMLDivElement;
  rechargepage.style.display = 'block'
  let balanceamountpage = document.getElementById("balanceamount") as HTMLDivElement;
  balanceamountpage.style.display = 'block'
  let menupage = document.getElementById("menupage") as HTMLDivElement;
  menupage.style.display = 'none'
  let returnpage = document.getElementById("returnpage") as HTMLDivElement;
  returnpage.style.display = "none";
  let borrowBookPage = document.getElementById("borrowBookPage") as HTMLDivElement;
  borrowBookPage.style.display = "none";
}

async function recharge() {
  let rechargeamount = parseInt((document.getElementById("rechargeamount") as HTMLInputElement).value);
  

  CurrentLoggedInUser.walletBalance += rechargeamount;
  await updateUser(CurrentLoggedInUser.userID, CurrentLoggedInUser);
  menu();

}

async function showBalance() {
  let showBalancePage = document.getElementById("balanceamount") as HTMLDivElement;
  let balanceamount = (document.getElementById("balance") as HTMLDivElement);
  let returnpage = document.getElementById("returnpage") as HTMLDivElement;
  returnpage.style.display = "none";
  let borrowBookPage = document.getElementById("borrowBookPage") as HTMLDivElement;
  borrowBookPage.style.display = "none";

 

  const checkpass = await fetchUsers();
  for (let i = 0; i < checkpass.length; i++) {
    if (checkpass[i].userID == CurrentLoggedInUser.userID) {
      balanceamount.innerHTML = checkpass[i].walletBalance.toString();
    }
  }
  showBalancePage.style.display = "block";
}

async function borrowBook() {
  let borrowBookPage = document.getElementById("borrowBookPage") as HTMLDivElement;
  let loginpage = document.getElementById("loginpage") as HTMLDivElement;
  loginpage.style.display = 'none'
  let rechargepage = document.getElementById("rechargepage") as HTMLDivElement;
  rechargepage.style.display = 'none'
  let balanceamountpage = document.getElementById("balanceamount") as HTMLDivElement;
  balanceamountpage.style.display = 'none'
  let returnpage = document.getElementById("returnpage") as HTMLDivElement;
  returnpage.style.display = "none";
  let bookdetailstable = document.getElementById("bookdetails") as HTMLTableElement;
  const books = await fetchBook();
  let borrowhistorypage = document.getElementById("borrowHistoryPage") as HTMLDivElement;
  borrowhistorypage.style.display = "none";
  bookdetailstable.innerHTML = "";
  bookdetailstable.innerHTML = `<tr>
                                <td>Book Name</td>
                                <td>Book Author</td>
                                <td>Book Count</td>
                                <td>Borrow Book</td></tr>`
  books.forEach(book => {
    if (book.bookCount >= 0) {
      bookdetailstable.innerHTML += `<tr><td>${book.bookName}</td>
                                    <td>${book.authorName}</td>
                                    <td>${book.bookCount}</td>
                                    <td><button onclick="borrowCount(${book.bookID})">Borrow</button></td></tr>`
    }
  });
  borrowBookPage.style.display = "block";
}

async function borrowCount(id: number) {
  let booklist = await fetchBook();
  let borrowcountpage = document.getElementById("borrowcountpage") as HTMLDivElement;
  borrowcountpage.style.display = "block";

  booklist.forEach(book => {
    if (id == book.bookID) {
      currentbook = book;
    }
  });

}

async function borrowBookButton() {
  let borrowlist = await fetchBorrow();
  let borrowbookcount = parseInt((document.getElementById("borrowCount") as HTMLInputElement).value);
  if (currentbook.bookCount >= borrowbookcount) {
    let userBookCounts = 0;
    borrowlist.forEach(borrow => {
      if (borrow.userID == CurrentLoggedInUser.userID) {
        userBookCounts = borrow.borrowBookCount;
      }
    });
    if (userBookCounts > 3) {
      alert("You have already borrowed 3 books ")
    }
    else {
      currentbook.bookCount -= borrowbookcount;
      let borrow: BorrowDetails = {
        borrowID: undefined,
        bookID: currentbook.bookID,
        userID: CurrentLoggedInUser.userID,
        borrowedDate: new Date,
        borrowBookCount: borrowbookcount,
        status: "Borrowed",
        paidFineAmount: 0
      }
      AddBorrowAPI(borrow);
      alert("Your return Date is " + returndate(new Date(), 15));
      updateBook(currentbook.bookID, currentbook)
      borrowBook();
    }
  }
  else {
    alert("Out of stock")
  }

}

function returndate(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function showborrowhistory() {
  let borrowList = await fetchBorrow();
  let borrowhistorypage = document.getElementById("borrowHistoryPage") as HTMLDivElement;
  let returnpage = document.getElementById("returnpage") as HTMLDivElement;
  returnpage.style.display = "none";
  let borrowBookPage = document.getElementById("borrowBookPage") as HTMLDivElement;
  borrowBookPage.style.display = "none";
  let borrowtable = document.getElementById("borrowHistoryTable") as HTMLTableElement;
  borrowhistorypage.style.display = "block";
  


  borrowtable.innerHTML = `<tr>
                            <th>Book ID</th>
                            <th>Borrowed Date</th>
                            <th>Borrowed Count</th>
                            <th>Borrowed Status</th>
                            <th>Paid Fine Amount</th></tr>`;

  borrowList.forEach(borrow => {

    if (CurrentLoggedInUser.userID == borrow.userID) {
      borrowtable.innerHTML += `
                    <tr>
                    <td class="tabelcell">${borrow.bookID} </td>
                    <td class="tabelcell">${borrow.borrowedDate.toString().substring(0, 10)} </td>
                    <td class="tabelcell">${borrow.borrowBookCount} </td>
                    <td class="tabelcell">${borrow.status} </td>
                    <td class="tabelcell">${borrow.paidFineAmount} </td>
                    </tr>
                    `;
    }

  });

}


async function returnpage() {
  let returnList = await fetchBorrow();
  let borrowBookPage = document.getElementById("borrowBookPage") as HTMLDivElement;
  borrowBookPage.style.display = 'none'
  let returntable = document.getElementById("returntable") as HTMLTableElement;
  let returnpage = document.getElementById("returnpage") as HTMLDivElement;
  let borrowhistorypage = document.getElementById("borrowHistoryPage") as HTMLDivElement;
  borrowhistorypage.style.display = "none";
  let menupage = document.getElementById("menupage") as HTMLDivElement;
  menupage.style.display = 'none'
  returnpage.style.display = "block";
  

  returntable.innerHTML = `<tr>
                            <th>Book ID</th>
                            <th>Borrowed Date</th>
                            <th>Borrowed Count</th>
                            <th>Book Count</th>
                            <th>Action</th></tr>`;
  returnList.forEach(retrun => {
    if (retrun.status == "Borrowed" && retrun.userID == CurrentLoggedInUser.userID) {
      returntable.innerHTML += `<tr>
                                <td >${retrun.bookID}</td>
                                <td >${retrun.borrowedDate.toString().substring(0,10)}</td>
                                <td >${retrun.borrowBookCount}</td>
                                <td ><button  onclick="returnBook('${retrun.borrowID}')"> Return </button></td>
                                </tr>`;
    }
  }
  );
}


async function returnBook(id:string)
{
    
    const borrowList = await fetchBorrow();
    const bookList = await fetchBook();

    borrowList.forEach(borrow =>
        {
            if(borrow.borrowID == id)
                {
                    const timeDifference = Math.abs(new Date(borrow.borrowedDate).getTime() - new Date().getTime()) ;
                    const daysDifference = Math.round(timeDifference/(1000*60*60*24)) ;
                    alert("You returned a book in " +daysDifference +" days");
                    if(daysDifference > 0)
                        {
                            if(CurrentLoggedInUser.walletBalance >= daysDifference - 15)
                                {

                                    bookList.forEach(book=>
                                        {
                                            if(book.bookID == borrow.bookID)
                                                {
                                                    book.bookCount+=borrow.borrowBookCount;
                                                    updateBook(book.bookID,book);
                                                    borrow.paidFineAmount = daysDifference -15;
                                                    borrow.status="Returned";
                                                    borrow.borrowBookCount=0
                                                    updateBorrow(borrow.borrowID,borrow);
                                                    CurrentLoggedInUser.walletBalance -= daysDifference-15;
                                                    updateUser(CurrentLoggedInUser.userID,CurrentLoggedInUser);
                                                    alert("Returned Successfully");
                                                    menu();
                                                }
                                        }
                                    );
                                }
                            else
                            {
                                alert("Your return date is more than 15 days. Please recharge atleast "+ daysDifference +" Rs for returning.");
                            }
                        }
                    else
                    {
                        borrow.status="Returned";
                        updateBorrow(borrow.borrowID,borrow);
                        bookList.forEach(book=>
                            {
                                if(book.bookID== borrow.bookID)
                                    {
                                        book.bookCount+=borrow.borrowBookCount;
                                        updateBook(book.bookID,book);
                                        alert("Returned Successfully");
                                        menu();
                                    }
                            }
                        );
                    } 
                }
        }
    );
}






