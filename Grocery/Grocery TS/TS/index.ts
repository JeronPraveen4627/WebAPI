let CurrentLogginUser:UserDetails;
let selectItem:GroceryDetails;

interface UserDetails
{
    userID:any,
    userName:string,
    emailID:string,
    phoneNumber:string,
    userPassword:string,
    walletBalance:number,
    userPhoto:string[]
}

interface GroceryDetails
{
    itemID:any,
    itemName:any,
    itemQuantity:number,
    unitPrice:number,
    itemExpiredDate:string,
    itemPhoto:string[]
}
interface OrderDetails
{
    orderID:any,
    userName:string,
    itemName:string,
    quantity:number,
    price:number
}

interface cart{
    itemID : number;
    itemName:string;
    cartQuantity:number;
    cartprice:number;
}

let cartList:cart[]=[];

async function AddUser(user: UserDetails): Promise<void> {
    const response = await fetch('http://localhost:5069/api/UserDetails',
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

async function fetchUsers(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5069/api/UserDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }

  async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5069/api/UserDetails/${id}`, {
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

  async function addgrocery(grocery: GroceryDetails): Promise<void> {
    const response = await fetch('http://localhost:5069/api/GroceryDetails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(grocery)
      });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
  }

  async function fetchgrocery(): Promise<GroceryDetails[]> {
    const apiUrl = 'http://localhost:5069/api/GroceryDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  }



function Showhomepage()
{
    let signuppage=document.getElementById("signuppage") as HTMLDivElement;
    let homepage=document.getElementById("homepage")as HTMLDivElement;
    signuppage.style.display="none";
    homepage.style.display="block";
    let menupage=document.getElementById("menupage") as HTMLDivElement;
    menupage.style.display="none";
    let homebuttonpage=document.getElementById("homebutton") as HTMLDivElement;
    homebuttonpage.style.display="none";
}

function newuser(){
    let signuppage=document.getElementById("signuppage") as HTMLDivElement;
    let homepage=document.getElementById("homepage")as HTMLDivElement;
    homepage.style.display="none";
    signuppage.style.display="block";
}

function signup(){
  
    let editingID:number=0;
    let newusername=document.getElementById("newusername")as HTMLInputElement;
    let newusermail=document.getElementById("newusermail") as HTMLInputElement;
    let newuserpassword=document.getElementById("newuserpassword") as HTMLInputElement;
    let newuserphone=document.getElementById("newuserphone") as HTMLInputElement;
    let userphoto=document.getElementById("userphoto") as HTMLInputElement;

    const name=newusername.value.trim();
    const password=newuserpassword.value.trim();
    const mailID=newusermail.value.trim();
    const number=newuserphone.value.trim();
    const photo=userphoto.files?.[0];
    const balance=0;

    if(photo){
        const reader=new FileReader();
        reader.onload=function(event)
        {
            const base64String=event.target?.result as string;
            console.log(base64String);

                const user:UserDetails=
                {
                    userID:editingID,
                    userName:name,
                    userPassword:password,
                    emailID:mailID,
                    phoneNumber:number,
                    walletBalance:balance,
                    userPhoto:[base64String]
                }
                AddUser(user);
                alert("Successfully Signup");
                Showhomepage();
        }
        reader.readAsDataURL(photo);
    }
}


function existinguser()
{
    let logginpage=document.getElementById("logginpage") as HTMLDivElement;
    logginpage.style.display="block"
    let homepage=document.getElementById("homepage")as HTMLDivElement;
    homepage.style.display="none";
}

async function login()
{
    let existingUserMail = (document.getElementById("existingusermail") as HTMLInputElement).value;
    let existingUserPassword = (document.getElementById("existinguserpassword") as HTMLInputElement).value;
    let flag: boolean = false;
  

    let users=await fetchUsers()

    users.forEach(user =>{
        if(user.emailID==existingUserMail && user.userPassword==existingUserPassword)
            {
                flag=true;
                CurrentLogginUser=user;
                alert("Login Successfully")
                Mainmenu();
            }
    });
    if(flag==false)
        {
            alert("Invalid Username or Password");
        }
}
function Mainmenu()
{
    let menupage=document.getElementById("menupage") as HTMLDivElement;
    menupage.style.display="block";
    let logginpage=document.getElementById("logginpage") as HTMLDivElement;
    logginpage.style.display="none"
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";




    let homepage=document.getElementById("homebutton") as HTMLDivElement;
    homepage.style.display="none";
    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="none";
    let addgrocerypage=document.getElementById("addgrocerypage") as HTMLDivElement;
    addgrocerypage.style.display="none"
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="none";
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="none"
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="none";
}

function homebar()
{

    let menupage=document.getElementById("menupage") as HTMLDivElement;
    menupage.style.display="block";
    let homepage=document.getElementById("homebutton") as HTMLDivElement;
    homepage.style.display="block";
    let welcome=document.getElementById("welcome") as HTMLDivElement;
    welcome.innerHTML="Hi "+`${CurrentLogginUser.userName}`;
    let img = document.getElementById("img") as HTMLImageElement;
    img.src=CurrentLogginUser.userPhoto[0];
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";


    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="none";
    let addgrocerypage=document.getElementById("addgrocerypage") as HTMLDivElement;
    addgrocerypage.style.display="none"
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="none";
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="none"
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="none";
}


async function grocerypage()
{
    let menupage=document.getElementById("menupage") as HTMLDivElement;
    menupage.style.display="block";
    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="block";

    let addgrocerypage=document.getElementById("addgrocerypage") as HTMLDivElement;
    addgrocerypage.style.display="none";
    let homepage=document.getElementById("homebutton") as HTMLDivElement;
    homepage.style.display="none";
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="none";
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="none"
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="none";
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";

    

    const grocerys = await fetchgrocery();
    let grocerytable=document.getElementById("grocerytable") as HTMLDivElement;
    grocerytable.innerHTML="";
    grocerytable.innerHTML=`<tr>
                            <td>Grocery Name</td>
                            <td>Available Quantity</td>
                            <td>Expired Date</td>
                            <td>Price</td>
                            <td>Image</td>
                            </tr>`  

    let img = document.getElementById("img") as HTMLImageElement;
    grocerys.forEach(grocery =>{
        grocerytable.innerHTML+=`<tr>
                                <td>${grocery.itemName}</td>
                                <td>${grocery.itemQuantity}</td>
                                <td>${grocery.unitPrice}</td>
                                <td>${grocery.itemExpiredDate}</td>
                                <td><img src="${grocery.itemPhoto}"></td>
                                </tr>`

    });



}
function addgrocerypage()
{
    let addgrocerypage=document.getElementById("addgrocerypage") as HTMLDivElement;
    addgrocerypage.style.display="block";
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="none";
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="none"
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="none";
    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="none";
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";


}


function groceryadd()
{


    let editingID:number=0;
    let groceryname=document.getElementById("groceryname")as HTMLInputElement;
    let availablequantity=document.getElementById("availablequantity") as HTMLInputElement;
    let expireddate=document.getElementById("expireddate") as HTMLInputElement;
    let price=document.getElementById("price") as HTMLInputElement;
    let groceryphoto=document.getElementById("groceryphoto") as HTMLInputElement;

    const name=groceryname.value.trim();
    const quantity=availablequantity.value.trim();
    const expire=new Date(expireddate.value);
    const amount=price.value.trim();
    const photo=groceryphoto.files?.[0];

    if(photo){
        const reader=new FileReader();
        reader.onload=function(event)
        {
            const base64String=event.target?.result as string;
            console.log(base64String);

                const grocery:GroceryDetails=
                {
                    itemID:editingID,
                    itemName:name,
                    unitPrice:Number(amount),
                    itemExpiredDate:expire.toISOString(),
                    itemQuantity:Number(quantity),
                    itemPhoto:[base64String]
                }
                addgrocery(grocery);
                grocerypage();
        }
        reader.readAsDataURL(photo);
    }
    return false;
}



async function purchaseGrocery()
{
    const grocerys = await fetchgrocery();

    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="none";
    let grocerytable=document.getElementById("purchasetable") as HTMLDivElement;
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="block";
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="none"
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="none";
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";


    grocerytable.innerHTML="";
    grocerytable.innerHTML=`<tr>
                            <td>Grocery Name</td>
                            <td>Available Quantity</td>
                            <td>Expired Date</td>
                            <td>Image</td>
                            <td>Price</td>
                            <td>Cart</td>
                            </tr>`
    grocerys.forEach(grocery =>{
        grocerytable.innerHTML+=`<tr>
                                <td>${grocery.itemName}</td>
                                <td>${grocery.itemQuantity}</td>
                                <td>${grocery.unitPrice}</td>
                                <td>${grocery.itemExpiredDate}</td>
                                <td><img id="img" src="${grocery.itemPhoto}"></td>
                                <td><button onclick="addcart(${grocery.itemID})">Add Cart</button></td>
                                </tr>`
    });
    
}

async function addcart(id:number){
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="block"
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="none";
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="none";
    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="none";
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";





    let grocerys = await fetchgrocery();
    
            grocerys.forEach(grocery => {
                if(grocery.itemID == id){
                    selectItem = grocery;
                }
                
            });
}

async function addcartitem()
{
    let cartquantity=document.getElementById("cartquantity") as HTMLInputElement
        let cartItem:cart={
            itemID : selectItem.itemID,
            cartQuantity:Number(cartquantity),
            itemName:selectItem.itemName,
            cartprice:selectItem.unitPrice        
        }
        cartList.push(cartItem);
}
   

function mycard(){
    let mycartpage=document.getElementById("mycartpage") as HTMLDivElement;
    mycartpage.style.display="block";
    let purchasegrocerypage=document.getElementById("purchasegrocerypage") as HTMLDivElement;
    purchasegrocerypage.style.display="none";
    let cartquantitypage=document.getElementById("cartquantitypage") as HTMLDivElement
    cartquantitypage.style.display="none"
    let grocerypage=document.getElementById("grocerypage") as HTMLDivElement;
    grocerypage.style.display="none";
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="none";



    let carttable=document.getElementById("carttable") as HTMLTableElement;
    carttable.innerHTML=""
    carttable.innerHTML=`<tr>
                        <td>Item Quantity</td>
                        <td>Item Name</td>
                        <td>Cart Price</td>
                        </tr>`
    cartList.forEach(cartItem => {

        carttable.innerHTML+=`<tr>
                            <td> ${cartItem.itemName}</td>
                            <td> ${cartItem.cartQuantity} </td>
                            <td> ${cartItem.cartprice}</td>
                            </tr>`
        
    });
            
}




function rechargepage()
{
    let rechargepage=document.getElementById("rechargepage") as HTMLDivElement;
    rechargepage.style.display="block";
    let userbalance=document.getElementById("userbalance") as HTMLDivElement;
    userbalance.innerHTML="Your Balance Amount is : "+CurrentLogginUser.walletBalance.toString();
}
async function recharge()
{
    let balanceamount=(document.getElementById("balanceamount") as HTMLInputElement).value;
    CurrentLogginUser.walletBalance+=Number(balanceamount);
    await updateUser(CurrentLogginUser.userID, CurrentLogginUser);
    rechargepage();
}




