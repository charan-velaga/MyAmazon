export const deliveryOptions=[
{
    id:'1',
    deliveryDays:7,
    costInCents:0,
},
{
    id:'2',
    deliveryDays:3,
    costInCents:499,
},
{
    id:'3',
    deliveryDays:1,
    costInCents:999,
}
];

export function findDeliverOption(cartDeliveryID){
    let myOption;
    deliveryOptions.forEach(option=>{
        if(cartDeliveryID==option.id){
            myOption= option;
        }
    })
    return myOption;
}