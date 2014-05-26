'use strict';

var myObj = {
  name: "Luis",
  age: 35,
  profession: "Designer"
}

for (var prop in myObj) {
  if (myObj.hasOwnProperty(prop)) {
    console.log(prop + ": " + myObj[prop]);
  }
}
