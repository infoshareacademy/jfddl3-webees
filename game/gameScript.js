// NEEDED :
// draw of owl position at begin
// draw of fox position at begin
// draw of diamond positions

var start = document.getElementById('start');

start.addEventListener('click', function (event) {
    treePositions = [];
    for (var i = 0; i < 99; i++) { // trees auto-generator
        window['treeXY' + i] = [Math.floor(Math.random() * 20) * 5, Math.floor(Math.random() * 20) * 5]


        function treeAlreadyExist(array, item) {
            for (var j = 0; j < array.length; j++) {
                if (array[j][0] === item[0] && array[j][1] === item[1]) {
                    window['treeXY' + i] = [Math.floor(Math.random() * 20) * 5, Math.floor(Math.random() * 20) * 5];
                    treeAlreadyExist(treePositions, window['treeXY' + i])
                }
            }
        }

        treeAlreadyExist(treePositions, window['treeXY' + i]) // avoid many trees at the same position
        treePositions.push(window['treeXY' + i]);
        window['tree' + i] = document.createElement('div');
        board.appendChild(window['tree' + i]);
        window['tree' + i].style.left = window['treeXY' + i][0] + '%';
        window['tree' + i].style.top = window['treeXY' + i][1] + '%';
        window['tree' + i].classList.add('tree')
    }


    // funkcja draw przyda sie takze do losowania pozycji lisa i diamentow
    function draw() {
        position = [Math.floor(Math.random()*20)*5, Math.floor(Math.random()*20)*5]
        for (var i = 0; i < treePositions.length; i++)
            if (position === treePositions[i]) draw()
        console.log(position)
        return position
    }

    var owlPosition = draw() // draw start Owl position

    // check if [item1,item2] exists in array
    function isItemInArray(array, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][0] === item[0] && array[i][1] === item[1]) return true
        }
        return false;
    }

    var owl = document.createElement('div')
    owl.classList.add('owl')
    board.appendChild(owl)
    owl.style.left = owlPosition[0] + '%';
    owl.style.top = owlPosition[1] + '%';


    /* OWL MOVES CONDITIONS */

    function owlUp() {
        var newPosition = [+owl.style.left.slice(0, -1), +owl.style.top.slice(0, -1) - 5]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.top = owl.style.top === "0%" ?
            owl.style.top
            :
            (owlOnTree ? owl.style.top : +owl.style.top.slice(0, -1) - 5 + '%')
    }

    function owlRight() {
        var newPosition = [+owl.style.left.slice(0, -1) + 5, +owl.style.top.slice(0, -1)]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.left = owl.style.left === "95%" ?
            owl.style.left
            :
            (owlOnTree ? owl.style.left : +owl.style.left.slice(0, -1) + 5 + '%')
    }

    function owlDown() {
        var newPosition = [+owl.style.left.slice(0, -1), +owl.style.top.slice(0, -1) + 5]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.top = owl.style.top === "95%" ?
            owl.style.top
            :
            (owlOnTree ? owl.style.top : +owl.style.top.slice(0, -1) + 5 + '%')
    }

    function owlLeft() {
        var newPosition = [+owl.style.left.slice(0, -1) - 5, +owl.style.top.slice(0, -1)]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.left = owl.style.left === "0%" ?
            owl.style.left
            :
            (owlOnTree ? owl.style.left : +owl.style.left.slice(0, -1) - 5 + '%')
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') owlUp()
        else if (event.key === 'ArrowRight') owlRight()
        else if (event.key === 'ArrowDown') owlDown()
        else if (event.key === 'ArrowLeft') owlLeft()
    })

/************************************************/

   // DIAMONDS
    var diamond = document.createElement('div')
    board.appendChild(diamond)
    diamond.classList.add('diamond')
    var diamondPosition = draw()
    diamond.style.left = diamondPosition[0]+'%'
    diamond.style.top = diamondPosition[1]+'%'
    setInterval(function(){
        var diamondPosition = draw()
        diamond.style.left = diamondPosition[0]+'%'
        diamond.style.top = diamondPosition[1]+'%'
    },5000)

    //FOX
    var fox = document.createElement('div')
    board.appendChild(fox)
    fox.classList.add('fox')
    var foxPosition = draw()
    fox.style.left = foxPosition[0]+'%'
    fox.style.top = foxPosition[1]+'%'
    setInterval(function(){
        var drawfoxMove = [Math.round(Math.random()*2-1)*5, Math.round(Math.random()*2-1)*5]
        fox.style.left =
            (+fox.style.left.slice(0,-1) + drawfoxMove[0] > 95 || +fox.style.left.slice(0,-1) + drawfoxMove[0] < 0)?
                fox.style.left : +fox.style.left.slice(0,-1) + drawfoxMove[0] + '%'
        fox.style.top =
            (+fox.style.top.slice(0,-1) + drawfoxMove[1] > 95 || +fox.style.top.slice(0,-1) + drawfoxMove[1] < 0)?
                fox.style.top : +fox.style.top.slice(0,-1) + drawfoxMove[1] + '%'
    },250)

    var fox2 = document.createElement('div')
    board.appendChild(fox2)
    fox2.classList.add('fox')
    var fox2Position = draw()
    fox2.style.left = fox2Position[0]+'%'
    fox2.style.top = fox2Position[1]+'%'
    setInterval(function(){
        var drawfox2Move = [Math.round(Math.random()*2-1)*5, Math.round(Math.random()*2-1)*5]
        fox2.style.left =
            (+fox2.style.left.slice(0,-1) + drawfox2Move[0] > 95 || +fox2.style.left.slice(0,-1) + drawfox2Move[0] < 0)?
                fox2.style.left : +fox2.style.left.slice(0,-1) + drawfox2Move[0] + '%'
        fox2.style.top =
            (+fox2.style.top.slice(0,-1) + drawfox2Move[1] > 95 || +fox2.style.top.slice(0,-1) + drawfox2Move[1] < 0)?
                fox2.style.top : +fox2.style.top.slice(0,-1) + drawfox2Move[1] + '%'
    },250)







})

/************************************************/

