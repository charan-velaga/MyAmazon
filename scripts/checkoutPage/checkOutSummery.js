import {products} from '../../data/products.js'
import {cart,removeFromCart,updateQuantity,updateDeliveryOption} from '../../data/cart.js'
import {fixTwoDecimals,dayDateText} from '../utlity/utl.js'
import {deliveryOptions,findDeliverOption} from '../../data/deliveryOption.js'
import { calculateCost } from './checkOutCost.js'

export let myDeliveryDate;

export function renderOrderSummary(){
    const eachProduct=document.querySelector('.checkout-cart-products')
    if(cart.length==0){
        eachProduct.innerHTML=`<div class="no-items-cart">Cart is empty.  Add items..</div><div class="no-items-cart"><a href="../../index.html">Buy Products</a></div>`
    }
    else{
    let checkoutHtml="";

    const totalIteamsCount=document.querySelector('.checkout-items-count')
    totalIteamsCount.innerHTML=cart.length;


    cart.forEach((value)=>{
        const cartDeliveryID=value.deliveryOptionId;
        let optionInDelivery=findDeliverOption(cartDeliveryID);
        const displayDate=dayDateText(optionInDelivery.deliveryDays);
        products.forEach(p=>{
            if(value.id==p.id){
            checkoutHtml+= `<div class="checkout-each-product js-each-product-${p.id}">
                    <div class="checkout-delivery-date">Delivery date: ${displayDate}
                    </div>
                    <div class="cart-details">
                        <div><img src=${p.image} alt="product image" class="product-img">
                        </div>
                        <div>
                            <div class="product-name">${p.name}</div>
                            <div class="product-cost">$${fixTwoDecimals(p.priceCents)}</div>
                            <div class="product-quantity">Quantity: 
                                <span class="product-quantity-count js-product-quantity-count" data-product-id=${value.id}>${value.quantity}</span>
                                <input type="number" class="update-input js-input-text no-display" value="3">
                                <span class="product-update secondary-link js-product-update">update</span>
                            <span class="product-delete secondary-link js-product-delete" data-product-id=${value.id}>delete</span>
                            </div>
                        </div>
                        <div class="delivery-options">
                            <div class="delivery-options-text">Choose a delivery option:</div>
                            ${deliveryOptionText(value)}
                        </div>
                    </div>
                </div>
                `
            }
        })
    })
    eachProduct.innerHTML=checkoutHtml;

    function deliveryOptionText(value){
        let myHtml="";
        deliveryOptions.forEach(deliveryOption=>{
            const displayDate=dayDateText(deliveryOption.deliveryDays);
            const costDisplay= deliveryOption.costInCents?`$${fixTwoDecimals(deliveryOption.costInCents)} - `:'FREE';
            const isChecked=value.deliveryOptionId===deliveryOption.id;
            myHtml+=`
            <div class="delivery-date-options js-delivery-data-options" data-product-id="${value.id}" data-delivery-id="${deliveryOption.id}">
                <div>
                    <input type="radio"  ${isChecked?'checked':''} class="option-radio"
                    name="delivery-option-${value.id}">
                </div>
                <div class="delivery-date-shipping">
                    <div class="day-date-option">
                        ${displayDate}
                    </div>
                    <div class="shipping-type">
                        ${costDisplay} Shipping
                    </div>
                </div>
            </div>
            `
        })
        return myHtml;
    }

    
    document.querySelectorAll('.js-delivery-data-options').forEach(deliveryClick=>{
        deliveryClick.addEventListener('click',()=>{
            const {productId,deliveryId}=deliveryClick.dataset;
            updateDeliveryOption(productId,deliveryId);
            renderOrderSummary();
            calculateCost();
        })
    })



    document.querySelectorAll('.js-product-delete').forEach(delButton=>{
        delButton.addEventListener('click',()=>{
            const productId=delButton.dataset.productId;
            removeFromCart(productId);
            const eachProduct=document.querySelector(`.js-each-product-${productId}`);
            eachProduct.remove();
            totalIteamsCount.innerHTML=cart.length;
            renderOrderSummary();
            calculateCost();
        })
    })


    document.querySelectorAll('.js-product-update').forEach(updateButton=>{
        updateButton.addEventListener('click',(event)=>{
            const productContainer=event.target.closest('.product-quantity')
            const updateOrSave=productContainer.querySelector('.product-update')
            const isUpdating=productContainer.querySelector('.js-input-text');
            const updateText=productContainer.querySelector('.js-product-quantity-count');
            if(updateOrSave.innerText=="update"){
                updateOrSave.innerText="save"
                isUpdating.classList.add('show-display');
                updateText.classList.add('no-display');
            }
            else{
                updateOrSave.innerText="update";
                let updatedQuantityValue=productContainer.querySelector('.update-input').value;
                updateQuantity(updatedQuantityValue,updateText.dataset.productId);
                updateText.innerHTML=updatedQuantityValue;
                isUpdating.classList.remove('show-display');
                updateText.classList.remove('no-display');
            }
            calculateCost();
        })
    })
}
}