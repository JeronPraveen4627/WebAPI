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
let CurrentLoggedInUser;
let currentbook;
function AddUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5277/api/UserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    });
}
function AddBookAPI(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5277/api/BookDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to add medicine');
        }
    });
}
function AddBorrowAPI(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5277/api/BorrowDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5277/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updateBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5277/api/BookDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5277/api/BorrowDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5277/api/UserDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
function deleteBookAPI(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5277/api/BookDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete medicine');
        }
    });
}
function deleteBorrow(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5277/api/BorrowDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
    });
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5277/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5277/api/BookDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5277/api/BorrowDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function homepage() {
    let homepage = document.getElementById('homepage');
    let signup = document.getElementById('signuppage');
    let loginpage = document.getElementById("loginpage");
    loginpage.style.display = "none";
    signup.style.display = "none";
    homepage.style.display = "block";
}
function newUserPage() {
    let signup = document.getElementById('signuppage');
    let homepage = document.getElementById('homepage');
    let loginpage = document.getElementById("loginpage");
    loginpage.style.display = "none";
    homepage.style.display = "none";
    signup.style.display = "block";
}
function existingUserPage() {
    let loginpage = document.getElementById("loginpage");
    let homepage = document.getElementById('homepage');
    let signup = document.getElementById('signuppage');
    homepage.style.display = "none";
    signup.style.display = "none";
    loginpage.style.display = "block";
}
function signup() {
    let name = document.getElementById("newuserName").value;
    let newuserEmail = document.getElementById("newuserEmail").value;
    let newUserPassword = document.getElementById("newuserPassword").value;
    let newgender = document.getElementById("newgender").value;
    let newdepartment = document.getElementById("newdepartment").value;
    let newmobile = document.getElementById("newmobile").value;
    const user = {
        userID: undefined,
        userName: name,
        mailID: newuserEmail,
        userPassword: newUserPassword,
        mobileNumber: newmobile,
        gender: newgender,
        department: newdepartment,
        walletBalance: 0
    };
    alert("Registration Successful");
    AddUser(user);
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        let existingUserMail = document.getElementById("exsitingEmail").value;
        let existingUserPassword = document.getElementById("exsitingPassword").value;
        let flag = false;
        const users = yield fetchUsers();
        users.forEach(user => {
            if (user.mailID == existingUserMail && user.userPassword == existingUserPassword) {
                flag = true;
                CurrentLoggedInUser = user;
                menu();
            }
        });
        if (flag == false)
            alert("Invalid User Name or Password");
    });
}
function menu() {
    let menupage = document.getElementById("menupage");
    menupage.style.display = 'block';
    let loginpage = document.getElementById("loginpage");
    loginpage.style.display = 'none';
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = 'none';
    let balanceamountpage = document.getElementById("balanceamount");
    balanceamountpage.style.display = 'none';
    let returnpage = document.getElementById("returnpage");
    returnpage.style.display = "none";
    let borrowBookPage = document.getElementById("borrowBookPage");
    borrowBookPage.style.display = "none";
}
function rechargePage() {
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = 'block';
    let balanceamountpage = document.getElementById("balanceamount");
    balanceamountpage.style.display = 'block';
    let menupage = document.getElementById("menupage");
    menupage.style.display = 'none';
    let returnpage = document.getElementById("returnpage");
    returnpage.style.display = "none";
    let borrowBookPage = document.getElementById("borrowBookPage");
    borrowBookPage.style.display = "none";
}
function recharge() {
    return __awaiter(this, void 0, void 0, function* () {
        let rechargeamount = parseInt(document.getElementById("rechargeamount").value);
        CurrentLoggedInUser.walletBalance += rechargeamount;
        yield updateUser(CurrentLoggedInUser.userID, CurrentLoggedInUser);
        menu();
    });
}
function showBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        let showBalancePage = document.getElementById("balanceamount");
        let balanceamount = document.getElementById("balance");
        let returnpage = document.getElementById("returnpage");
        returnpage.style.display = "none";
        let borrowBookPage = document.getElementById("borrowBookPage");
        borrowBookPage.style.display = "none";
        const checkpass = yield fetchUsers();
        for (let i = 0; i < checkpass.length; i++) {
            if (checkpass[i].userID == CurrentLoggedInUser.userID) {
                balanceamount.innerHTML = checkpass[i].walletBalance.toString();
            }
        }
        showBalancePage.style.display = "block";
    });
}
function borrowBook() {
    return __awaiter(this, void 0, void 0, function* () {
        let borrowBookPage = document.getElementById("borrowBookPage");
        let loginpage = document.getElementById("loginpage");
        loginpage.style.display = 'none';
        let rechargepage = document.getElementById("rechargepage");
        rechargepage.style.display = 'none';
        let balanceamountpage = document.getElementById("balanceamount");
        balanceamountpage.style.display = 'none';
        let returnpage = document.getElementById("returnpage");
        returnpage.style.display = "none";
        let bookdetailstable = document.getElementById("bookdetails");
        const books = yield fetchBook();
        let borrowhistorypage = document.getElementById("borrowHistoryPage");
        borrowhistorypage.style.display = "none";
        bookdetailstable.innerHTML = "";
        bookdetailstable.innerHTML = `<tr>
                                <td>Book Name</td>
                                <td>Book Author</td>
                                <td>Book Count</td>
                                <td>Borrow Book</td></tr>`;
        books.forEach(book => {
            if (book.bookCount >= 0) {
                bookdetailstable.innerHTML += `<tr><td>${book.bookName}</td>
                                    <td>${book.authorName}</td>
                                    <td>${book.bookCount}</td>
                                    <td><button onclick="borrowCount(${book.bookID})">Borrow</button></td></tr>`;
            }
        });
        borrowBookPage.style.display = "block";
    });
}
function borrowCount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let booklist = yield fetchBook();
        let borrowcountpage = document.getElementById("borrowcountpage");
        borrowcountpage.style.display = "block";
        booklist.forEach(book => {
            if (id == book.bookID) {
                currentbook = book;
            }
        });
    });
}
function borrowBookButton() {
    return __awaiter(this, void 0, void 0, function* () {
        let borrowlist = yield fetchBorrow();
        let borrowbookcount = parseInt(document.getElementById("borrowCount").value);
        if (currentbook.bookCount >= borrowbookcount) {
            let userBookCounts = 0;
            borrowlist.forEach(borrow => {
                if (borrow.userID == CurrentLoggedInUser.userID) {
                    userBookCounts = borrow.borrowBookCount;
                }
            });
            if (userBookCounts > 3) {
                alert("You have already borrowed 3 books ");
            }
            else {
                currentbook.bookCount -= borrowbookcount;
                let borrow = {
                    borrowID: undefined,
                    bookID: currentbook.bookID,
                    userID: CurrentLoggedInUser.userID,
                    borrowedDate: new Date,
                    borrowBookCount: borrowbookcount,
                    status: "Borrowed",
                    paidFineAmount: 0
                };
                AddBorrowAPI(borrow);
                alert("Your return Date is " + returndate(new Date(), 15));
                updateBook(currentbook.bookID, currentbook);
                borrowBook();
            }
        }
        else {
            alert("Out of stock");
        }
    });
}
function returndate(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function showborrowhistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let borrowList = yield fetchBorrow();
        let borrowhistorypage = document.getElementById("borrowHistoryPage");
        let returnpage = document.getElementById("returnpage");
        returnpage.style.display = "none";
        let borrowBookPage = document.getElementById("borrowBookPage");
        borrowBookPage.style.display = "none";
        let borrowtable = document.getElementById("borrowHistoryTable");
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
    });
}
function returnpage() {
    return __awaiter(this, void 0, void 0, function* () {
        let returnList = yield fetchBorrow();
        let borrowBookPage = document.getElementById("borrowBookPage");
        borrowBookPage.style.display = 'none';
        let returntable = document.getElementById("returntable");
        let returnpage = document.getElementById("returnpage");
        let borrowhistorypage = document.getElementById("borrowHistoryPage");
        borrowhistorypage.style.display = "none";
        let menupage = document.getElementById("menupage");
        menupage.style.display = 'none';
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
                                <td >${retrun.borrowedDate.toString().substring(0, 10)}</td>
                                <td >${retrun.borrowBookCount}</td>
                                <td ><button  onclick="returnBook('${retrun.borrowID}')"> Return </button></td>
                                </tr>`;
            }
        });
    });
}
function returnBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowList = yield fetchBorrow();
        const bookList = yield fetchBook();
        borrowList.forEach(borrow => {
            if (borrow.borrowID == id) {
                const timeDifference = Math.abs(new Date(borrow.borrowedDate).getTime() - new Date().getTime());
                const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
                alert("You returned a book in " + daysDifference + " days");
                if (daysDifference > 0) {
                    if (CurrentLoggedInUser.walletBalance >= daysDifference - 15) {
                        bookList.forEach(book => {
                            if (book.bookID == borrow.bookID) {
                                book.bookCount += borrow.borrowBookCount;
                                updateBook(book.bookID, book);
                                borrow.paidFineAmount = daysDifference - 15;
                                borrow.status = "Returned";
                                borrow.borrowBookCount = 0;
                                updateBorrow(borrow.borrowID, borrow);
                                CurrentLoggedInUser.walletBalance -= daysDifference - 15;
                                updateUser(CurrentLoggedInUser.userID, CurrentLoggedInUser);
                                alert("Returned Successfully");
                                menu();
                            }
                        });
                    }
                    else {
                        alert("Your return date is more than 15 days. Please recharge atleast " + daysDifference + " Rs for returning.");
                    }
                }
                else {
                    borrow.status = "Returned";
                    updateBorrow(borrow.borrowID, borrow);
                    bookList.forEach(book => {
                        if (book.bookID == borrow.bookID) {
                            book.bookCount += borrow.borrowBookCount;
                            updateBook(book.bookID, book);
                            alert("Returned Successfully");
                            menu();
                        }
                    });
                }
            }
        });
    });
}
