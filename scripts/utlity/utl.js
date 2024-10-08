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
export function getDateFromDate(mydate){
    const monthDate=dayjs(mydate,"MMMM D");
    const dayMonthDate=monthDate.format("dddd, MMMM D")
    return dayMonthDate;
}
export function getDifferenceInDays(date1,date2){
    const d1=dayjs(date1,"MMMM D");
    const d2=dayjs(date2,"MMMM D");
    return d2.diff(d1,'day');

}