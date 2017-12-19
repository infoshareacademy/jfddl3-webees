// NEEDED :
// draw of owl position at begin
// draw of fox position at begin
// draw of diamond positions

var start = document.getElementById('start');

start.addEventListener('click', init)

function init() {
    treePositions = [];
    for (var i = 0; i < 99; i++) { // trees auto-generator
        window['treeXY' + i] = [Math.floor(Math.random() * 20) * 5, Math.floor(Math.random() * 20) * 5]


        function treeAlreadyExist(array, item) {
            for (var j = 0; j < array.length; j++) {
                if (array[j][0] === item[0] && array[j][1] === item[1]) {
                    window['treeXY' + i] = [Math.floor(Math.random() * 20) * 5, Math.floor(Math.random() * 20) * 5]; //BUG
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
        var position = [Math.floor(Math.random() * 20) * 5, Math.floor(Math.random() * 20) * 5]
        for (var i = 0; i < treePositions.length; i++)
            if ((position[0] === treePositions[i][0]) && (position[1] === treePositions[i][1])) {
                position = draw()
            }
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
    diamond.style.left = diamondPosition[0] + '%'
    diamond.style.top = diamondPosition[1] + '%'
    setInterval(function () {
        var diamondPosition = draw()
        diamond.style.left = diamondPosition[0] + '%'
        diamond.style.top = diamondPosition[1] + '%'
    }, 5000)

    // FOX CONSTRUCTOR

    function Fox(foxNumber) {
        this.init()
        this.foxMove()
    }

    Fox.prototype.init = function(foxNumber) {
        this.element = document.createElement('div')
        this.element.classList.add('fox')
        this.position = draw()
        this.element.style.left = this.position[0] + '%'
        this.element.style.top = this.position[1] + '%'
        board.appendChild(this.element)
    }

    Fox.prototype.foxMove = function() {
        var foxMoveRandom = () => {
            return Math.round(Math.random() * 2 - 1) * 5
        }
        var drawFoxMove = () => {
            var foxMoveXY = [foxMoveRandom(), foxMoveRandom()]
            for (var i = 0; i < treePositions.length; i++) {
                console.log(this)
                if ((+this.element.style.left.slice(0, -1) + foxMoveXY[0] === treePositions[i][0])
                    &&
                    (+this.element.style.top.slice(0, -1) + foxMoveXY[1] === treePositions[i][1]))
                    foxMoveXY = drawFoxMove()
                return foxMoveXY
            }
        }

        return setInterval(() => {
            var foxPosition = drawFoxMove()
            console.log(foxPosition)
            console.log(this.element.style.left, this.element.style.top)
            this.element.style.left =
                (
                    +this.element.style.left.slice(0, -1) + foxPosition[0] > 95
                    ||
                    +this.element.style.left.slice(0, -1) + foxPosition[0] < 0
                ) ?
                    this.element.style.left
                    :
                    (+this.element.style.left.slice(0, -1) + foxPosition[0]) + '%'
            this.element.style.top =
                (
                    +this.element.style.top.slice(0, -1) + foxPosition[1] > 95
                    ||
                    +this.element.style.top.slice(0, -1) + foxPosition[1] < 0
                ) ?
                    this.element.style.top
                    :
                    +this.element.style.top.slice(0, -1) + foxPosition[1] + '%'
            console.log(this.element.style.left, this.element.style.top)
        }, 250)
    }

    // FOX AUTO GENERATOR
    var fox = new Fox(0)

    setInterval(function () {
        initialFoxNumber = 1
        var nextFox = new Fox(initialFoxNumber)
        initialFoxNumber++
    }, 10000)

    start.removeEventListener('click', init, false)
}


/************************************************/

