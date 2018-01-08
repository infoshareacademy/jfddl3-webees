let description = document.createElement('div')
let start = document.createElement('div')
description.className = 'description'
start.className = 'start'
description.innerHTML = '<h1>Dziękujemy za rejestrację</h1> <h2>Pora na pierwszy trening!</h2> <p>Jesteś sową. Lisy wiedzą, ze masz problem z lataniem i chcą Cię upolować na kolację. Stado lisów wciąż się powiększa!</p><p>Uciekaj przed lisami zbierając diamenty. Masz trzy życia. Możesz poruszać się strzałkami w 4 kierunkach, lisy natomiast biegają aż w 8 kierunkach!</p><p>W lewym górnym rogu widzisz ilość zebranych diamentów, w prawym - ilość żyć.</p><h2>Powodzenia!</h2>'
start.innerText = 'Start'
document.body.appendChild(description)
description.appendChild(start)
start.addEventListener('click', init)

function init() {
    nav = document.createElement('nav')
    document.body.appendChild(nav)
    divCont = document.createElement('div')
    nav.appendChild(divCont)
    diamondIconCont = document.createElement('div')
    scoreCont = document.createElement('div')
    scoreText = document.createElement('span')
    diamondIconCont.className = 'diamondIcon'
    scoreCont.setAttribute('id', 'score')
    scoreText.setAttribute('id', 'scoreText')
    // scoreText.innerText = '0'
    divCont.appendChild(diamondIconCont)
    divCont.appendChild(scoreCont)
    scoreCont.appendChild(scoreText)
    owlsCont = document.createElement('div')
    owlsCont.setAttribute('id', 'owls')
    nav.appendChild(owlsCont)
    owlIcon1 = document.createElement('div')
    owlIcon2 = document.createElement('div')
    owlIcon3 = document.createElement('div')
    owlIcon1.className = 'owlIcon'
    owlIcon2.className = 'owlIcon'
    owlIcon3.className = 'owlIcon'
    owlsCont.appendChild(owlIcon1)
    owlsCont.appendChild(owlIcon2)
    owlsCont.appendChild(owlIcon3)

    description.remove()
    start.remove()
    let board = document.createElement('div')
    board.className = 'board'
    document.body.appendChild(board)
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
            this.element.remove()
        }, 6000)
    }

    setInterval(() => new Fox(), 6000)
    setInterval(() => new Diamond(), 6000)

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

    function owlOnFox() {
        var actualFoxesPositions = []
        for (let i = 0; i < document.getElementsByClassName('fox').length; i++) {
            foxesCounter = document.getElementsByClassName('fox')
            for (let i = 0; i < foxesCounter.length; i++) {
                actualFoxesPositions[i] = [foxesCounter[i].style.left, foxesCounter[i].style.top]
            }
            owlOnFoxCheck = isItemInArray(actualFoxesPositions, [owl.style.left, owl.style.top])

            if (owlOnFoxCheck && !points.immortal) {
                blinkBoardColor("red")
                lifeDecrease()
            }
        }
    }

    function owlOnDiamond() {
        var actualDiamond = document.getElementsByClassName('diamond')[0]
        if (actualDiamond !== undefined && (actualDiamond.style.left === owl.style.left) && (actualDiamond.style.top === owl.style.top)) {
            blinkBoardColor("blue")
            diamondsIncrease()
            // change diamond position after score ???
        }
    }

    function blinkBoardColor(setColor = "green") {
        board.style.backgroundColor = setColor;
        setTimeout(() => board.style.backgroundColor = "green", 200)
    }

    let points = {
        immortal: false,
        life: 3,
        diamonds: 0
    }

    function lifeDecrease() {
        if (points.life > 0) {
            --points.life
            if (points.life > 0) {
                let lifeIcons = document.getElementsByClassName('owlIcon')
                owls.removeChild(lifeIcons[lifeIcons.length - 1]);
                (function () { points.immortal = true })()
                setTimeout(() => { points.immortal = false }, 1000)
            }
            else if (points.life === 0) {
                setTimeout(function () {
                    board.remove()
                    nav.remove()
                    document.removeEventListener('keydown', controls, false)
                    document.body.appendChild(description)
                    let highScore = localStorage.getItem('highScore') || 0
                    let highScoreAlert = ''
                    if (points.diamonds > highScore) {
                        localStorage.setItem('highScore', points.diamonds)
                        highScoreAlert = '<h3>Gratulacje! To twój najlepszy wynik!</h3>'
                    }
                    description.innerHTML = "<h1>ZOSTAŁEŚ UPOLOWANY</h1><h3>Zebrane diamenty: " + points.diamonds + "</h3>" + highScoreAlert
                    description.appendChild(start)
                    start.innerText = 'Zagraj jeszcze raz'
                    start.addEventListener('click', init)
                    let returnButton = document.createElement('div')
                    description.appendChild(returnButton)
                    returnButton.innerText = 'Powrót do WEBEES'
                    returnButton.className = 'start'
                    returnButton.addEventListener('click', function () { window.location.href = '../index.html' })
                }, 200)
            }
        }
    }

    function diamondsIncrease() {
        ++points.diamonds;
        scoreText.innerText = points.diamonds;
        let diamond = document.getElementsByClassName('diamond')[0]
        diamond.remove()
    }

    start.removeEventListener('click', init, false)
}
