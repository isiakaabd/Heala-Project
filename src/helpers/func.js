export const arrangeItems = (array) => {
  let finalArray = [];
  let n = 0;
  let arrayValues = [];
  let arrayObject = {};
  arrayObject.name = undefined;

  // array.sort();
  array.forEach((element) => {
    let container = element.split(":");
    if (arrayObject.name == container[0]) {
      arrayValues.push(container[1]);
      arrayObject.value = arrayValues;
    } else {
      finalArray[n] = arrayObject;
      arrayValues = [];
      arrayObject = {};
      arrayObject.name = container[0];
      arrayValues.push(container[1]);
      arrayObject.value = arrayValues;
      n += 1;
    }
  });
  finalArray.shift();
  return finalArray;
};
