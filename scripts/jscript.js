import {cart , addToCart, findCartQuantity} from '/data/cart.js';
import { products } from '/data/products.js';
import { fixTwoDecimals } from './utlity/utl.js';


document.querySelector('.header__cart-count').innerHTML=findCartQuantity();
const bodyHTML=document.querySelector('.main');

function renderIndexPage(data=products){
    let bodyText="";
    data.forEach(value => {
        bodyText+=`<div class="main__product">
                <div class="main__product-image">
                    <img src="${value.image}" alt="product-image" class="main__product-img">
                </div>
                <div class="main__product-name">
                    ${value.name}
                </div>
                <div class="main__product-rating">
                    <img src="images/ratings/rating-${(value.rating.stars)*10}.png" alt="rating" width="100" height="20" class="main__rating-stars">
                    <span class="main__rating-count">${value.rating.count}</span>
                </div>
                <div class="main__product-cost">$${fixTwoDecimals(value.priceCents)}</div>
                <div class="main__quantity">
                    <select class="main__product-quantity" id="product-quantity-option-${value.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="choose-size js-choose-size">${displaySize(value)}</div>
                <div class="main__product-added js-added-to-cart"></div>
                <button class="main__add-cart-button js-add-cart" data-product-id="${value.id}">Add to Cart</button>
            </div>`
    });
    bodyHTML.innerHTML=bodyText;
}
renderIndexPage();

function displaySize(item){
    if(item.type==="clothing"){
        return `<button class="size-button js-size-button" data-size="S">S</button>
        <button class="size-button js-size-button" data-size="M">M</button>
        <button class="size-button js-size-button" data-size="L">L</button>
        <button class="size-button js-size-button" data-size="XL">XL</button>`
    }
    return "";
}

function updateCartQuantity(){
        let totalquantity=0;
        cart.forEach(cartItem=>{
            totalquantity+=cartItem.quantity
        })
        document.querySelector('.header__cart-count').innerHTML=totalquantity;
}

document.querySelectorAll('.js-add-cart').forEach((button)=>{
    button.addEventListener('click',(event)=>{
        const pId=button.dataset.productId;
        const productContainer=event.target.closest('.main__product');
        const addMessage= productContainer.querySelector('.js-added-to-cart');
            addMessage.innerHTML=`<img src="/images/icons/checkmark.png" width="10" heigh="10"><span>Added<span>`;
            setTimeout(()=>{
                addMessage.innerHTML="";
            },1000);
        let quantitySelected=Number(productContainer.querySelector(`#product-quantity-option-${pId}`).value);
        addToCart(pId,quantitySelected);
        updateCartQuantity();
    })
});
function searchProducts(){
    let mylist=[];
    const inputGiven=searchBar.value.toLowerCase();
    products.forEach(item=>{
        if(item.keywords.includes(inputGiven)){
            mylist.push(item);
        }
    })
    if(inputGiven===""){
        renderIndexPage();
    }
    else if(mylist.length==0){
        bodyHTML.innerHTML=`<div class="no-products">No products available....</div>`
    }
    else{
        renderIndexPage(mylist);
    }
}
const searchBar=document.querySelector('.js-search-bar');
searchBar.addEventListener('keypress',event=>{
    if(event.key=='Enter'){
        searchProducts();
    }
})
document.querySelector('.js-search-button').addEventListener('click',()=>{
    searchProducts();
})

const selectButton=document.querySelectorAll('.js-choose-size')
let sizeSelected;
selectButton.forEach(button=>{
    button.addEventListener('click',(event)=>{
        if (event.target.classList.contains('js-size-button')) {
            button.querySelectorAll('.js-size-button').forEach(button => {
                button.classList.remove('selected-size');
            });
        }
        event.target.classList.add('selected-size');
        sizeSelected=event.target.dataset.size;
    })
})