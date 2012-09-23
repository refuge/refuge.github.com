Date.parseRFC3339 = function (string) {
    var date=new Date(0);
    var match = string.match(/(\d{4})-(\d\d)-(\d\d)\s*(?:[\sT]\s*(\d\d):(\d\d)(?::(\d\d))?(\.\d*)?\s*(Z|([-+])(\d\d):(\d\d))?)?/);
    if (!match) return;
    if (match[2]) match[2]--;
    if (match[7]) match[7] = (match[7]+'000').substring(1,4);
    var field = [null,'FullYear','Month','Date','Hours','Minutes','Seconds','Milliseconds'];
    for (var i=1; i<=7; i++) if (match[i]) date['setUTC'+field[i]](match[i]);
    if (match[9]) date.setTime(date.getTime()+(match[9]=='-'?1:-1)*(match[10]*3600000+match[11]*60000) );
    return date.getTime();
}

// Localize the display of <time> elements
function localizeDates() {
    var lastdate = '';
    var now = new Date();

    //document.querySelectorAll('time').forEach(function(el, index) {
    var elements = document.querySelectorAll('time');
    var n = elements.length;
    for(var index=0; index<n; index++) {
        var el = elements[index];
        if (el.getAttribute('title') == "GMT") {
            var date = new Date(Date.parseRFC3339(el.getAttribute('datetime')));
            if (!date.getTime())
                return;
            diff = ((now.getTime() - date.getTime()) / 1000),
            day_diff = Math.floor(diff / 86400);
            if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
                return;
            var text = date.toLocaleString();
            var title = date.toLocaleString();
            
            if (day_diff == 0) {
                text = (diff < 60 && "just Now" ||
                diff < 120 && "1 minute ago" ||
                diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
                diff < 7200 && "1 hour ago" ||
                diff < 86400 && Math.floor( diff / 3600 ) + " hours ago");
                title = date.toLocaleTimeString();
            } else {
                hours = date.getHours();
                minutes = date.getMinutes();
                hours = (hours < 10) && "0" + hours || hours;
                minutes = (minutes < 10) && "0" + minutes || minutes;
                text = (day_diff == 1 && "yesterday at " +  hours + ":" + minutes ||
                        day_diff < 31 && "about " + day_diff + " days ago" ||
                        date.toLocaleString());
                title = date.toLocaleString();
            }
            el.setAttribute('title', title);
            el.setAttribute('diff', day_diff);
            el.textContent = text;
        }
    }

}