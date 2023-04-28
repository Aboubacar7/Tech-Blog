module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear() + 5
      }`;
    },
  };

  // document.cookie= "mycookie=myvalue";
  // var expirationDate = new Date();
  // expirationDate.setTime(expirationDate.getTime() + (30 * 60 * 1000));
  // document.cookie = "mycookie=myvalue;expires" + expirationDate.toUTCString();

  //  var alertTime = expirationDate.getTime()-(1 * 60 * 1000);
  // setTimeout(function() {
  //   alert("Your session will expire in 1 minute. Please save your work and refresh the page to continue.");
  // }, alertTime - Date.now());

  // module.exports = setTimeout()