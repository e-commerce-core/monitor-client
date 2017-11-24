const perfData = performance.timing;

const keys = Object.keys(Object.getPrototypeOf(perfData));
keys.pop();

var perfArr = [];
keys.forEach(k => {
  perfArr.push({
    k,
    v: perfData[k]
  });
});

perfArr.sort((x1, x2) => x1.v - x2.v);

console.log(perfArr);
