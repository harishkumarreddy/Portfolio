const fs = require("fs")
// f = fs.open("./test.txt", 'r',(err, data) =>{
//     console.log(data.toString())
// })

// f = fs.readFile("./test.txt", (err, data) =>{
//     console.log(data.toString().split("\n"))
// })

var frs = fs.createReadStream("./test.txt")
var fws = fs.createWriteStream("./test2.txt")
// frs.setEncodeing("utf8")
frs.on("data", (data)=>{
    fws.write(data.toString())
})


fws.write("Writing is done")