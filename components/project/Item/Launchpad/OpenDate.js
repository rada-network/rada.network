import { data } from "autoprefixer";

const OpenDate = ({ time }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const date = new Date(time)
  var zone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return <time>{formatAMPM(date)}, {date.toDateString("en-US", options)} ({zone})</time>
}
export default OpenDate