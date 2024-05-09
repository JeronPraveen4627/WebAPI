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
let CurrentLogginUser;
let selectItem;
let cartList = [];
function AddUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5069/api/UserDetails', {
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
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5069/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5069/api/UserDetails/${id}`, {
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
function addgrocery(grocery) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5069/api/GroceryDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(grocery)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    });
}
function fetchgrocery() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5069/api/GroceryDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function Showhomepage() {
    let signuppage = document.getElementById("signuppage");
    let homepage = document.getElementById("homepage");
    signuppage.style.display = "none";
    homepage.style.display = "block";
    let menupage = document.getElementById("menupage");
    menupage.style.display = "none";
    let homebuttonpage = document.getElementById("homebutton");
    homebuttonpage.style.display = "none";
}
function newuser() {
    let signuppage = document.getElementById("signuppage");
    let homepage = document.getElementById("homepage");
    homepage.style.display = "none";
    signuppage.style.display = "block";
}
function signup() {
    var _a;
    let editingID = 0;
    let newusername = document.getElementById("newusername");
    let newusermail = document.getElementById("newusermail");
    let newuserpassword = document.getElementById("newuserpassword");
    let newuserphone = document.getElementById("newuserphone");
    let userphoto = document.getElementById("userphoto");
    const name = newusername.value.trim();
    const password = newuserpassword.value.trim();
    const mailID = newusermail.value.trim();
    const number = newuserphone.value.trim();
    const photo = (_a = userphoto.files) === null || _a === void 0 ? void 0 : _a[0];
    const balance = 0;
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            console.log(base64String);
            const user = {
                userID: editingID,
                userName: name,
                userPassword: password,
                emailID: mailID,
                phoneNumber: number,
                walletBalance: balance,
                userPhoto: [base64String]
            };
            AddUser(user);
            alert("Successfully Signup");
            Showhomepage();
        };
        reader.readAsDataURL(photo);
    }
}
function existinguser() {
    let logginpage = document.getElementById("logginpage");
    logginpage.style.display = "block";
    let homepage = document.getElementById("homepage");
    homepage.style.display = "none";
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        let existingUserMail = document.getElementById("existingusermail").value;
        let existingUserPassword = document.getElementById("existinguserpassword").value;
        let flag = false;
        let users = yield fetchUsers();
        users.forEach(user => {
            if (user.emailID == existingUserMail && user.userPassword == existingUserPassword) {
                flag = true;
                CurrentLogginUser = user;
                alert("Login Successfully");
                Mainmenu();
            }
        });
        if (flag == false) {
            alert("Invalid Username or Password");
        }
    });
}
function Mainmenu() {
    let menupage = document.getElementById("menupage");
    menupage.style.display = "block";
    let logginpage = document.getElementById("logginpage");
    logginpage.style.display = "none";
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = "none";
    let homepage = document.getElementById("homebutton");
    homepage.style.display = "none";
    let grocerypage = document.getElementById("grocerypage");
    grocerypage.style.display = "none";
    let addgrocerypage = document.getElementById("addgrocerypage");
    addgrocerypage.style.display = "none";
    let purchasegrocerypage = document.getElementById("purchasegrocerypage");
    purchasegrocerypage.style.display = "none";
    let cartquantitypage = document.getElementById("cartquantitypage");
    cartquantitypage.style.display = "none";
    let mycartpage = document.getElementById("mycartpage");
    mycartpage.style.display = "none";
}
function homebar() {
    let menupage = document.getElementById("menupage");
    menupage.style.display = "block";
    let homepage = document.getElementById("homebutton");
    homepage.style.display = "block";
    let welcome = document.getElementById("welcome");
    welcome.innerHTML = "Hi " + `${CurrentLogginUser.userName}`;
    let img = document.getElementById("img");
    img.src = CurrentLogginUser.userPhoto[0];
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = "none";
    let grocerypage = document.getElementById("grocerypage");
    grocerypage.style.display = "none";
    let addgrocerypage = document.getElementById("addgrocerypage");
    addgrocerypage.style.display = "none";
    let purchasegrocerypage = document.getElementById("purchasegrocerypage");
    purchasegrocerypage.style.display = "none";
    let cartquantitypage = document.getElementById("cartquantitypage");
    cartquantitypage.style.display = "none";
    let mycartpage = document.getElementById("mycartpage");
    mycartpage.style.display = "none";
}
function grocerypage() {
    return __awaiter(this, void 0, void 0, function* () {
        let menupage = document.getElementById("menupage");
        menupage.style.display = "block";
        let grocerypage = document.getElementById("grocerypage");
        grocerypage.style.display = "block";
        let addgrocerypage = document.getElementById("addgrocerypage");
        addgrocerypage.style.display = "none";
        let homepage = document.getElementById("homebutton");
        homepage.style.display = "none";
        let purchasegrocerypage = document.getElementById("purchasegrocerypage");
        purchasegrocerypage.style.display = "none";
        let cartquantitypage = document.getElementById("cartquantitypage");
        cartquantitypage.style.display = "none";
        let mycartpage = document.getElementById("mycartpage");
        mycartpage.style.display = "none";
        let rechargepage = document.getElementById("rechargepage");
        rechargepage.style.display = "none";
        const grocerys = yield fetchgrocery();
        let grocerytable = document.getElementById("grocerytable");
        grocerytable.innerHTML = "";
        grocerytable.innerHTML = `<tr>
                            <td>Grocery Name</td>
                            <td>Available Quantity</td>
                            <td>Expired Date</td>
                            <td>Price</td>
                            <td>Image</td>
                            </tr>`;
        let img = document.getElementById("img");
        grocerys.forEach(grocery => {
            grocerytable.innerHTML += `<tr>
                                <td>${grocery.itemName}</td>
                                <td>${grocery.itemQuantity}</td>
                                <td>${grocery.unitPrice}</td>
                                <td>${grocery.itemExpiredDate}</td>
                                <td><img src="${grocery.itemPhoto}"></td>
                                </tr>`;
        });
    });
}
function addgrocerypage() {
    let addgrocerypage = document.getElementById("addgrocerypage");
    addgrocerypage.style.display = "block";
    let purchasegrocerypage = document.getElementById("purchasegrocerypage");
    purchasegrocerypage.style.display = "none";
    let cartquantitypage = document.getElementById("cartquantitypage");
    cartquantitypage.style.display = "none";
    let mycartpage = document.getElementById("mycartpage");
    mycartpage.style.display = "none";
    let grocerypage = document.getElementById("grocerypage");
    grocerypage.style.display = "none";
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = "none";
}
function groceryadd() {
    var _a;
    let editingID = 0;
    let groceryname = document.getElementById("groceryname");
    let availablequantity = document.getElementById("availablequantity");
    let expireddate = document.getElementById("expireddate");
    let price = document.getElementById("price");
    let groceryphoto = document.getElementById("groceryphoto");
    const name = groceryname.value.trim();
    const quantity = availablequantity.value.trim();
    const expire = new Date(expireddate.value);
    const amount = price.value.trim();
    const photo = (_a = groceryphoto.files) === null || _a === void 0 ? void 0 : _a[0];
    if (photo) {
        const reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            console.log(base64String);
            const grocery = {
                itemID: editingID,
                itemName: name,
                unitPrice: Number(amount),
                itemExpiredDate: expire.toISOString(),
                itemQuantity: Number(quantity),
                itemPhoto: [base64String]
            };
            addgrocery(grocery);
            grocerypage();
        };
        reader.readAsDataURL(photo);
    }
    return false;
}
function purchaseGrocery() {
    return __awaiter(this, void 0, void 0, function* () {
        const grocerys = yield fetchgrocery();
        let grocerypage = document.getElementById("grocerypage");
        grocerypage.style.display = "none";
        let grocerytable = document.getElementById("purchasetable");
        let purchasegrocerypage = document.getElementById("purchasegrocerypage");
        purchasegrocerypage.style.display = "block";
        let cartquantitypage = document.getElementById("cartquantitypage");
        cartquantitypage.style.display = "none";
        let mycartpage = document.getElementById("mycartpage");
        mycartpage.style.display = "none";
        let rechargepage = document.getElementById("rechargepage");
        rechargepage.style.display = "none";
        grocerytable.innerHTML = "";
        grocerytable.innerHTML = `<tr>
                            <td>Grocery Name</td>
                            <td>Available Quantity</td>
                            <td>Expired Date</td>
                            <td>Image</td>
                            <td>Price</td>
                            <td>Cart</td>
                            </tr>`;
        grocerys.forEach(grocery => {
            grocerytable.innerHTML += `<tr>
                                <td>${grocery.itemName}</td>
                                <td>${grocery.itemQuantity}</td>
                                <td>${grocery.unitPrice}</td>
                                <td>${grocery.itemExpiredDate}</td>
                                <td><img id="img" src="${grocery.itemPhoto}"></td>
                                <td><button onclick="addcart(${grocery.itemID})">Add Cart</button></td>
                                </tr>`;
        });
    });
}
function addcart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let cartquantitypage = document.getElementById("cartquantitypage");
        cartquantitypage.style.display = "block";
        let mycartpage = document.getElementById("mycartpage");
        mycartpage.style.display = "none";
        let purchasegrocerypage = document.getElementById("purchasegrocerypage");
        purchasegrocerypage.style.display = "none";
        let grocerypage = document.getElementById("grocerypage");
        grocerypage.style.display = "none";
        let rechargepage = document.getElementById("rechargepage");
        rechargepage.style.display = "none";
        let grocerys = yield fetchgrocery();
        grocerys.forEach(grocery => {
            if (grocery.itemID == id) {
                selectItem = grocery;
            }
        });
    });
}
function addcartitem() {
    return __awaiter(this, void 0, void 0, function* () {
        let cartquantity = document.getElementById("cartquantity");
        let cartItem = {
            itemID: selectItem.itemID,
            cartQuantity: Number(cartquantity),
            itemName: selectItem.itemName,
            cartprice: selectItem.unitPrice
        };
        cartList.push(cartItem);
    });
}
function mycard() {
    let mycartpage = document.getElementById("mycartpage");
    mycartpage.style.display = "block";
    let purchasegrocerypage = document.getElementById("purchasegrocerypage");
    purchasegrocerypage.style.display = "none";
    let cartquantitypage = document.getElementById("cartquantitypage");
    cartquantitypage.style.display = "none";
    let grocerypage = document.getElementById("grocerypage");
    grocerypage.style.display = "none";
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = "none";
    let carttable = document.getElementById("carttable");
    carttable.innerHTML = "";
    carttable.innerHTML = `<tr>
                        <td>Item Quantity</td>
                        <td>Item Name</td>
                        <td>Cart Price</td>
                        </tr>`;
    cartList.forEach(cartItem => {
        carttable.innerHTML += `<tr>
                            <td> ${cartItem.itemName}</td>
                            <td> ${cartItem.cartQuantity} </td>
                            <td> ${cartItem.cartprice}</td>
                            </tr>`;
    });
}
function rechargepage() {
    let rechargepage = document.getElementById("rechargepage");
    rechargepage.style.display = "block";
    let userbalance = document.getElementById("userbalance");
    userbalance.innerHTML = "Your Balance Amount is : " + CurrentLogginUser.walletBalance.toString();
}
function recharge() {
    return __awaiter(this, void 0, void 0, function* () {
        let balanceamount = document.getElementById("balanceamount").value;
        CurrentLogginUser.walletBalance += Number(balanceamount);
        yield updateUser(CurrentLogginUser.userID, CurrentLogginUser);
        rechargepage();
    });
}
