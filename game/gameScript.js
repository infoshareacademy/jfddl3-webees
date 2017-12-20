// NEEDED :
// draw of owl position at begin
// draw of fox position at begin
// draw of diamond positions

var start = document.getElementById('start')
var board = document.getElementById('board')

start.addEventListener('click', init)

function init() {
    board.removeChild(start);
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


    // draw no tree position
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

    // OWL CREATION

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
        owlOnFox()
        owlOnDiamond()
    }

    function owlRight() {
        var newPosition = [+owl.style.left.slice(0, -1) + 5, +owl.style.top.slice(0, -1)]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.left = owl.style.left === "95%" ?
            owl.style.left
            :
            (owlOnTree ? owl.style.left : +owl.style.left.slice(0, -1) + 5 + '%')
        owlOnFox()
        owlOnDiamond()
    }

    function owlDown() {
        var newPosition = [+owl.style.left.slice(0, -1), +owl.style.top.slice(0, -1) + 5]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.top = owl.style.top === "95%" ?
            owl.style.top
            :
            (owlOnTree ? owl.style.top : +owl.style.top.slice(0, -1) + 5 + '%')
        owlOnFox()
        owlOnDiamond()
    }

    function owlLeft() {
        var newPosition = [+owl.style.left.slice(0, -1) - 5, +owl.style.top.slice(0, -1)]
        var owlOnTree = isItemInArray(treePositions, newPosition)
        owl.style.left = owl.style.left === "0%" ?
            owl.style.left
            :
            (owlOnTree ? owl.style.left : +owl.style.left.slice(0, -1) - 5 + '%')
        owlOnFox()
        owlOnDiamond()
    }

    document.addEventListener('keydown', controls)
    function controls(event) {
        if (event.key === 'ArrowUp') owlUp()
        else if (event.key === 'ArrowRight') owlRight()
        else if (event.key === 'ArrowDown') owlDown()
        else if (event.key === 'ArrowLeft') owlLeft()
    }

    /************************************************/

    // DIAMOND CONSTRUCTOR

    function Diamond() {
        this.init()
        this.diamondRemove()
    }

    Diamond.prototype.init = function () {
        this.element = document.createElement('div')
        this.element.classList.add('diamond')
        this.position = draw()
        this.element.style.left = this.position[0] + '%'
        this.element.style.top = this.position[1] + '%'
        board.appendChild(this.element)
    }

    Diamond.prototype.diamondRemove = function () {
        setTimeout(() => {
            board.removeChild(this.element)
        }, 4000)
    }


    // FOX CONSTRUCTOR

    function Fox() {
        this.init()
        this.foxMove()
    }

    Fox.prototype.init = function () {
        this.element = document.createElement('div')
        this.element.classList.add('fox')
        this.position = draw()
        this.element.style.left = this.position[0] + '%'
        this.element.style.top = this.position[1] + '%'
        board.appendChild(this.element)
    }

    Fox.prototype.foxMove = function () {
        var foxRandomStep = () => {
            return Math.round(Math.random() * 2 - 1) * 5
        }
        var drawFoxMove = () => {
            var foxMoveXY = [foxRandomStep(), foxRandomStep()]
            var foxOnTree = isItemInArray(treePositions, [+this.element.style.left.slice(0, -1) + foxMoveXY[0], +this.element.style.top.slice(0, -1) + foxMoveXY[1]])
            return foxOnTree ? drawFoxMove() : foxMoveXY
        }
        return setInterval(() => {
            var foxStep = drawFoxMove()
            this.element.style.left =
                (
                    +this.element.style.left.slice(0, -1) + foxStep[0] > 95
                    ||
                    +this.element.style.left.slice(0, -1) + foxStep[0] < 0
                ) ?
                    this.element.style.left
                    :
                    +this.element.style.left.slice(0, -1) + foxStep[0] + '%'
            this.element.style.top =
                (
                    +this.element.style.top.slice(0, -1) + foxStep[1] > 95
                    ||
                    +this.element.style.top.slice(0, -1) + foxStep[1] < 0
                ) ?
                    this.element.style.top
                    :
                    +this.element.style.top.slice(0, -1) + foxStep[1] + '%'

            this.position = [this.element.style.left, this.element.style.top]

            owlOnFox()


        }, 700)
    }

// FOX AUTO GENERATE
    var actualFoxesPositions = [];
    setInterval(() => fox = new Fox(), 16000);          // new fox after 16 seconds

// DIAMONDS AUTO GENERATE
    setInterval(() => diamond = new Diamond(), 4000);   // new diamond after 8 seconds

    function owlOnFox() {
        for (let i = 0; i < document.getElementsByClassName('fox').length; i++) {
            foxesCounter = document.getElementsByClassName('fox')
            for (let i = 0; i < foxesCounter.length; i++) {
                actualFoxesPositions[i] = [foxesCounter[i].style.left, foxesCounter[i].style.top]
            }
            owlOnFoxCheck = isItemInArray(actualFoxesPositions, [owl.style.left, owl.style.top])

            if (owlOnFoxCheck) {
                blinkBoardColor("red")
                points.lifeDecrease()
            }
        }
    }


    function owlOnDiamond() {
        var actualDiamond = document.getElementsByClassName('diamond')[0]
        if (actualDiamond !== undefined && (actualDiamond.style.left === owl.style.left) && (actualDiamond.style.top === owl.style.top)) {
            blinkBoardColor("blue")
            points.diamondsIncrease()
        }
    }

    function blinkBoardColor(setColor = "green") {
        board.style.backgroundColor = setColor;
        setTimeout(() => board.style.backgroundColor = "green", 200)
    }


// GAME COUNTERS : LIFE AND DIAMONDS
    let points = {
        life: 3,                                                          // start life count
        diamonds: 0,                                                      // start diamonds count
        lifeDecrease: function() {
            --this.life;
            if(this.life === 0) {
                board.style.backgroundColor = "black";
                board.appendChild(start)
                start.innerHTML = "GAME&nbsp;OVER"
                document.removeEventListener('keydown', controls, false)}    // GAME OVER !!!!
            let lifeIcons = document.querySelectorAll('.owlIcon');
            owls.removeChild(lifeIcons[lifeIcons.length - 1])
        },
        diamondsIncrease: function() {
            ++this.diamonds;
            let pointIcon = document.createElement('img');
            pointIcon.setAttribute('src', 'img/diamond.png');
            pointIcon.style.width = '0.5em';
            score.appendChild(pointIcon)
            scoreText.innerText = this.diamonds;
        },
    }

    start.removeEventListener('click', init, false)
}


/************************************************/

