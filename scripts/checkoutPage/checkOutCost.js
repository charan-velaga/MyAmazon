import { cart,saveToStorage } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { findDeliverOption } from "../../data/deliveryOption.js";
import { fixTwoDecimals, dateMonthText } from "../utlity/utl.js";
import { orders } from "../../data/orderitems.js";

export function calculateCost(){
    let itemsCost=0,shippingCost=0,totalBeforeTax=0,estimatedTax=0,totalquantity=0;
    cart.forEach(cartItem => {
        products.forEach(productItem=>{
            if(cartItem.id===productItem.id){
                itemsCost+=(productItem.priceCents * cartItem.quantity);
                totalquantity+=cartItem.quantity;
            }
        })
        let deliverySelected;
        deliverySelected=findDeliverOption(cartItem.deliveryOptionId);
        shippingCost+=deliverySelected.costInCents;
    });
    totalBeforeTax=itemsCost+shippingCost;
    estimatedTax=totalBeforeTax/10;
    let totalCartCost=fixTwoDecimals(totalBeforeTax+estimatedTax);
    document.querySelector('.checkout-bill').innerHTML=`
            <div class="order-summary">Order Summary</div>
            <div class="payment-summary">
                <div>Items (${totalquantity}):</div>
                <div>$${fixTwoDecimals(itemsCost)}</div>
            </div>
            <div class="payment-summary">
                <div>Shipping & handling: </div>
                <div>$${fixTwoDecimals(shippingCost)}</div>
            </div>
            <div class="payment-summary">
                <div>Total before tax:</div>
                <div>$${fixTwoDecimals(totalBeforeTax)}</div>
            </div>
            <div class="payment-summary">
                <div>Estimated tax (10%):</div> 
                <div>$${fixTwoDecimals(estimatedTax)}</div>
            </div>
            <div class="payment-summary">
                <div>Order total:</div>
                <div>$${totalCartCost}</div>
            </div>
            <button class="order-button js-place-order">place your order</button>
    `
    document.querySelector('.js-place-order').addEventListener('click',()=>{
        if(cart.length!=0){
        let pList=[];
        cart.forEach(cartItem=>{
            pList.push({
                id:cartItem.id,
                quantity:cartItem.quantity,
                deliveryDay:dateMonthText(findDeliverOption(cartItem.deliveryOptionId).deliveryDays)
            }
            )
        })
        orders.unshift({
            productsList:pList,
            totalCost: totalCartCost,
            orderedDate:dateMonthText(0),
            orderId: crypto.randomUUID()
        });
        localStorage.setItem('orders',JSON.stringify(orders));
        cart.splice(0,cart.length)
        saveToStorage();
        
        window.location.href ="../../orders.html";
    }
    else{
        document.querySelector('.checkout-cart-products').innerHTML=`<div class="no-items-cart">Cart is empty.  Add items..</div><div class="no-items-cart">Please add items to place an order</div><div class="no-items-cart"><a href="../../index.html">Buy Products</a></div>`
    }
    })
}