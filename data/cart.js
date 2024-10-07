export let cart=JSON.parse(localStorage.getItem('cart'))||[];


export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId,quantitySelected){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if((cartItem.id)===productId){
            matchingItem=cartItem;
        }
    })
    if(matchingItem){
        matchingItem.quantity+=quantitySelected;
    }
    else{
        cart.push({
            id:productId,
            quantity:quantitySelected,
            deliveryOptionId:'1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId){
    const newcart=[];
    cart.forEach(item=>{
        if (item.id!=productId){
            newcart.push(item)
        }
    })
    cart=newcart;
    saveToStorage();
}

export function updateQuantity(newquantity,productId){
    cart.forEach(value=>{
        if(value.id===productId){
            value.quantity=Number(newquantity);
        }
    })
    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryId){
    cart.forEach(value=>{
        if(value.id===productId){
            value.deliveryOptionId=deliveryId;
        }
    })
    saveToStorage();
}
export function findCartQuantity(){
    let q=0;
    cart.forEach(cartItem=>{
        q+=cartItem.quantity;
    })
    return q;
}