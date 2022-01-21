
class Event{
    constructor(year, month, day, name, description){
        this.year = year;
        this.month = month;
        this.day = day;
        this.name = name;
        this.description = description;
    }
}

class Day{
    constructor(year, month, monthIndex, day, name, weekdayIndex){
        this.name = name;
        this.year = year;
        this.month = month;
        this.monthIndex = monthIndex;
        this.number = day;
        this.weekdayIndex = weekdayIndex;
        this.events = [];
        this.element = this.createDayElement();
    }
    addEvent(name, description){
        this.events.push(new Event(this.year, this.month, this.number, name, description));
    }
    createDayElement(){
        let div = document.createElement('div');
        div.setAttribute('id', `${this.name.substring(0,3)}-${this.number}-${this.month.substring(0,3)}-${this.year}`);
        div.setAttribute('class', 'day');
        let p = document.createElement('p');
        p.setAttribute('class', 'date');
        p.innerText = this.number;
        div.appendChild(p);
        return div;
    }
}

class Month{
    
    constructor(year, name, number, index){
        this.WeekDayTitles = ["Sunday", "Monday", "Tuesay", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.year = year;
        this.name = name;
        this.number = number;
        this.index = index;
        this.nod = new Date(this.year, this.index + 1, 0).getDate();
        this.days = this.createDays(this.nod)
    }
    createDays(nod){
        let arr = [];
        let weekday;
        for(let i = 0; i < nod; i++){
            weekday = new Date(this.year, this.index, i+1).getDay();
            arr.push(new Day(this.year, this.name, this.index, i + 1, this.WeekDayTitles[weekday], weekday));
        }
        return arr;
    }
}

class Year{
    
    constructor(year){
        this.MonthTitles = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.year = year;
        this.Months = this.createMonths();
    }
    createMonths(){
        let arr = [];
        for(let i = 0; i < 12; i++){
            arr.push(new Month(this.year, this.MonthTitles[i], i+1, i))
        }
        return arr;
    }
    
}

class Calendar{
    constructor(year){
        this.Year = new Year(year);
    }
    getMonth(y,m){
        return new Year(y).Months.find(month => month.number === m);
    }
    getDay(y,m,d){
        return new Year(y).Months.find(month => month.number === m).days.find(day => day.number === d);
    }
    getDays(){
        let arr = [];
        for(let i = 0; i < this.Year.Months.length; i++){
            for(let j = 0; j < this.Year.Months[i].days.length; j++){
                arr.push(this.Year.Months[i].days[j]);
            }
        }
        return arr;
    }
    createDaysDocumentFragment(){
        let df = new DocumentFragment();
        for(let i = 0; i < this.Year.Months.length; i++){
            for(let j = 0; j < this.Year.Months[i].days.length; j++){
                df.appendChild(this.Year.Months[i].days[j].element);
            }
        }
        return df;
    }
}
