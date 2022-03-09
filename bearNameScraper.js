// https://www.fantasynamegenerators.com/pet-bear-names.php

var keepalive = true;
var sleep = (time) => new Promise((res) => setTimeout(res, time));
var bucket = new Set();
var $btn = $("[value='Get male names']");
// var $btn = $("[value='Get female names']");

async function main() {
  // var count = 5;
  var count = 10010;
  while (bucket.size < count && keepalive) {
    $btn.click();
    await sleep(100);
    var names = $("#result")[0].innerHTML.split("<br>").slice(0, -1);
    names.forEach((n) => bucket.add(n));
    console.log(bucket.size);
  }
}

main().then(console.log).catch(console.error);
