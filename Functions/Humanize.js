import moment from "moment";

//Humanize function helps to convert time to a more readable format!.
function humanize(time) {
  const formattedTime = moment.duration(time).humanize();
  return formattedTime;
}

export default humanize;

//eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
