
let sList = ["a", "b", "c", "d"];

let mapList = sList.map(item=>item)

// sList.map((item,index) => )

var names = sList.map(student => student.name);
console.log(names);

//forEach does not return anything
var names2=sList.forEach(student=>student.name);

var prin3 = princesses.filter(princess=>princess.age>=18);