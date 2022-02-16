
function readFromLS(key) {
    let data = JSON.parse(localStorage.getItem(key));
    console.log('Successfully fetched ' + data.length + ' toDos from key ' + key);
    return data;
  }
  
  function writeToLS(key, data) {
    localStorage.setItem(key, data);
  }

export {
    readFromLS,
    writeToLS
}