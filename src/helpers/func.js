export const arrangeItems = (array) => {
  const finalArray = [];
  array.forEach((element) => {
    let container = element.split(":");
    let elementKeys = container[0];
    let elementValues = container[1];
    if (finalArray.length != 0) {
      finalArray.forEach((item) => {
        if (item.includes(elementKeys)) {
          let result =
            item.slice(0, item.length - 1) + `, '${elementValues}'` + item.slice(item.length - 1);
          finalArray[finalArray.indexOf(item)] = result;
        } else if (finalArray.indexOf(item) == finalArray.length - 1) {
          finalArray.push(`${elementKeys}:{'${elementValues}'}`);
        }
      });
    } else {
      finalArray.push(`${elementKeys}:{${elementValues}}`);
    }
  });
  return finalArray;
};
