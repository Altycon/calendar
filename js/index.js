function init(){

    const calendar = new Calendar(2022);
    const dayArray = calendar.getDays();
    console.log(calendar)
    console.log(dayArray);
    
    const monthContainer = document.querySelector('.calendar-month');
    
    const df = calendar.createDaysDocumentFragment();
    monthContainer.appendChild(df);
}
document.addEventListener('DOMContentLoaded', init);