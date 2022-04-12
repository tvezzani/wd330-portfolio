function readFromLS(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data !== null){
      console.log('Successfully fetched ' + data.length + ' recipes from key ' + key);
    }
    else{
      console.log('Local storage is null at key ' + key);
    }
    return data;
  }
  
  function writeToLS(key, data) {
    localStorage.setItem(key, data);
  }

export {
    readFromLS,
    writeToLS
}