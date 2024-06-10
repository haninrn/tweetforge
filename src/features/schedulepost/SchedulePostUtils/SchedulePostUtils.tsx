export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getScheduleYears = ():JSX.Element[] => {
    let currentYear = new Date().getFullYear();
    let options:JSX.Element[] = [];

    for(let i=2; i>=0; i--){
        options.push(<option value={currentYear + i} key={currentYear + i}>{currentYear + i}</option>)
    }

    return options;
}

export const getScheduleHours = ():JSX.Element[] => {
    let options:JSX.Element[] = [];

    for(let i = 1; i<13; i++){
        options.push(<option value={i} key={i}>{i}</option>)
    }

    return options;
}

export const getScheduleMinutes = ():JSX.Element[] => {
    let options:JSX.Element[] = [];

    for(let i = 0; i<60; i++){
        if(i < 10){
            options.push(<option value={i} key={i}>0{i}</option>)
        } else {
            options.push(<option value={i} key={i}>{i}</option>)
        }
        
    }

    return options;
}

export const getAmPm = ():JSX.Element[] => {
    let options:JSX.Element[] = [];
    options.push(<option value={0} key="AM">AM</option>);
    options.push(<option value={1} key="PM">PM</option>);

    return options;
}