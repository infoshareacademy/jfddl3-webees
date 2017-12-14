var randomLength = Match.round (Match.random() *10 +1) *4
var array = []

for (var i = 0; i < randomLength; i++)
    array [i] = 'Index' + i


console.log(String(array))

var halfLenght = array.length /2
var newArray = array.slice(halfLenght -2, halfLenght +2)

x`