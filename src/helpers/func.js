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
  console.log(finalArray);
  return finalArray;
};

export const removeEmptyStringValues = (obj) => {
  try {
    let newObj = {};
    for (const key in obj) {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  } catch (err) {
    console.err("error from removeEmptyStringValues FN", err);
    return obj;
  }
};
