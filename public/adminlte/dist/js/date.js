var dt = new Date();
var year= dt.getFullYear();
var month= dt.getMonth();
var date= dt.getDate();
var day= dt.getDay();
var dayarray=["Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Saturday,","Sunday,"];
var montharray=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("date").innerHTML = dayarray[day]+" "+date+" "+montharray[month]+" "+year;
var dates = date+" "+montharray[month]+", "+year;
document.getElementById("dates").value = dates;