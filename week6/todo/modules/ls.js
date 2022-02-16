
function readFromLS(key) {
    let data = localStorage.getItem(key);
    //console.log('Successfully fetched ' + data + ' from ' + key);
    return localStorage.getItem(key);
  }
  
  function writeToLS(key, data) {
    localStorage.setItem(key, data);
    //console.log('Successfully wrote ' + data + ' to ' + key);
  }

export {
    readFromLS,
    writeToLS
}