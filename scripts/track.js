import {products,findProductById} from '../data/products.js'
import { orders } from '../data/orderitems.js';
import { getDateFromDate, getDifferenceInDays } from './utlity/utl.js';

const url = new URL(window.location.href);
const productId = url.searchParams.get('productId');
const myOrderId=url.searchParams.get('orderId');
let myquantity,mydate,differenceInDays,myOrderDate;

orders.forEach(myorder => {
    if(myorder.orderId===myOrderId){
        myOrderDate=myorder.orderedDate;
        myorder.productsList.forEach(pList=>{
            if(pList.id===productId){
                myquantity=pList.quantity;
                mydate=pList.deliveryDay;
                console.log(myOrderDate,mydate);
                differenceInDays=getDifferenceInDays(myOrderDate,mydate);
            }
        })
    }
});
mydate=getDateFromDate(mydate);
console.log(differenceInDays);
const myProduct=findProductById(productId);
document.querySelector('.js-generate-text').innerHTML=`
<div class="product-arriving-date">
            Arriving on ${mydate}
        </div>
        <div class="product-name">
            ${myProduct.name}
        </div>
        <div class="product-quantity">
            Quantity: ${myquantity}
        </div>
        <div class="product-image">
            <img src="${myProduct.image}" width="150" height="150">
        </div>
        <div class="display-track-text">
            <div class="current-status-lable">
                Preparing
            </div>
            <div>
                Shipped
            </div>
            <div>
                Delivered
            </div>
        </div>
        <div class="progress-bar">
            <div class="status-bar"></div>
        </div>
`

let widthSizePercent;
if(differenceInDays<1){
    widthSizePercent="100%";
}
else if(differenceInDays<3){
    widthSizePercent="50%";
}
else{
    widthSizePercent="10%";
}
const statusBar=document.querySelector('.status-bar');
setTimeout(()=>{
    statusBar.style.width=widthSizePercent;
},50)