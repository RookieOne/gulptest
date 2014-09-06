var fs = require("fs")

var stream = fs.createReadStream(__dirname + "/content/pages/hello_world.md");
stream.on("data", function(chunk) {
  console.log(chunk.toString())
})
stream.on("end", function() {
  console.log("END")
});
stream.on("error", function(er) {
  console.log("error", er)
});
