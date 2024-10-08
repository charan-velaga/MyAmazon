import { findProductById } from '../data/products.js';
import {cart, addToCart, findCartQuantity} from '../data/cart.js';
import {orders} from '../data/orderitems.js';

const ordersGrid=document.querySelector('.js-all-orders');
document.querySelector('.header__cart-count').innerHTML=findCartQuantity();
if(orders.length===0){
    ordersGrid.innerHTML=`<div class="no-orders">No orders available</div>`
}
else{
    let myHtml="";
    orders.forEach(orderItem=>{
            myHtml+=`<div class="order-header">
                        <div class="order-header-left">
                            <div class="order-date">
                                <div class="order-header-title">Order Placed</div>
                                <div>${orderItem.orderedDate}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-title">Total</div>
                                <div>$${orderItem.totalCost}</div>
                            </div>
                        </div>
                        <div class="order-header-right">
                            <div class="orderid">
                                <div class="order-header-title">Order ID:</div>
                                <div>${orderItem.orderId}</div>
                            </div>
                        </div>
                    </div>
                    <div class="products-container">
                    ${displayEachProduct(orderItem)}
                    </div>
                    `
    });
    ordersGrid.innerHTML=myHtml;

    function displayEachProduct(orderedItem){
        let totalHtml="";
        orderedItem.productsList.forEach(orderedList=>{
            let productItem=findProductById(orderedList.id);
            totalHtml+=`<div class="product-image">
                            <img src= ${productItem.image} alt="product image" width="110" height="110">
                        </div>
                        <div class="product-details">
                            <div class="product-name"> ${productItem.name}</div>
                            <div class="product-date">Arriving on: ${orderedList.deliveryDay}</div>
                            <div class="product-quantity">Quantity: ${orderedList.quantity}</div>
                            <button class="buy-again-button button-primary js-buy-again" data-ordered-id=${orderedList.id}> 
                                <img src="images/icons/buy-again.png" alt="buy again icon" width="20" height="20" class="buy-again-icon js-buy-again-icon">
                                <span class="buy-again-text js-buy-again-text">Buy it again</span>
                            </button>
                        </div>
                        <div class="track-button-section">
                        <button class="track-package-button button-secondary js-track-button js-track-${productItem.id}" data-product-id="${productItem.id}" data-order-id="${orderedItem.orderId}">Track Package</button>
                        </div>  
                        `
    })
    return totalHtml;
    }
}

document.querySelectorAll('.js-buy-again').forEach(button=>{
    button.addEventListener('click',(event)=>{
        const buyAgain=event.target.closest('.js-buy-again');
        const originalhtml=buyAgain.innerHTML;
        buyAgain.innerHTML="✓ Added"
        setTimeout(()=>{buyAgain.innerHTML=originalhtml},1000);
        const productId=buyAgain.dataset.orderedId;
        addToCart(productId,1);
        document.querySelector('.header__cart-count').innerHTML=findCartQuantity();
})
})
document.querySelectorAll('.js-track-button').forEach(button=>{
    button.addEventListener('click',()=>{
        const {productId,orderId}=button.dataset;
        window.location.href="../trackOrder.html?productId="+productId+"&orderId="+orderId;
    })
})