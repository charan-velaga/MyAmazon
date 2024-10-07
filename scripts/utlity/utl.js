import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export function fixTwoDecimals(costInCents){
    return (Math.round(costInCents)/100).toFixed(2);
}
export function dayDateText(myDate){
    const today=dayjs();
    const deliveryDate=today.add(myDate,'day');
    return deliveryDate.format('dddd, MMMM D');
}
export function dateMonthText(myDate){
    const today=dayjs();
    const deliveryDate=today.add(myDate,'day');
    return deliveryDate.format('MMMM D');
}