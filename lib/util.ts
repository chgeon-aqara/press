
export namespace util {

    export function timeToDecimal(timeString: string, targetDate: string, debug?: boolean ) {
    
        const splt = timeString.split('T');
        const date = new Date( splt[0] );
        const time = splt[1].split('+')[0];
        const tarr = time.split(':')
    
        var hours = parseInt(tarr[0]);
        var minutes = parseInt(tarr[1]);
        var seconds = parseInt(tarr[2]);
      
        var hoursFromMinutes= minutes / 60;
        var hoursFromSeconds = seconds / 3600;
    
        if (date > new Date(targetDate)) {
            return (23 + 59 / 60 + 59 / 3600) * 60
        } else if ( date < new Date(targetDate )) {
            return 0;
        }
      
        return (hours + hoursFromMinutes + hoursFromSeconds) * 60;
    }
}