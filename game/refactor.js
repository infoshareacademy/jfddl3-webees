let board = document.createElement('div')
let start = document.createElement('div')
board.className = 'board'
start.className = 'start'
start.innerText = 'Start'
board.appendChild(start)
document.body.appendChild(board)
start.addEventListener('click', init)

function init() {
    start.remove();
    let treePositions = treeGenerator(90)
    let owl = owlCreator(treePositions)
    document.addEventListener('keydown', function (event) { controls(event, owl, treePositions) })
    setInterval(() => new Diamond(treePositions), 5000)
    setInterval(() => new Fox(treePositions, owl), 6000)
}

function drawUniquePositions(treePositions) {
    let ranNum0to95 = function () { return (Math.floor(Math.random() * 20) * 5) }
    let position = [ranNum0to95(), ranNum0to95()]
    for (let i = 0; i < treePositions.length; i++) {
        if (treePositions[i][0] === position[0] && treePositions[i][1] === position[1])
            position = drawUniquePositions(treePositions)
    }
    return position
}

function treeGenerator(treeCount) {
    let treePositions = []
    for (let j = 0; j < treeCount; j++) {
        let newTreePosition = drawUniquePositions(treePositions)
        treePositions.push(newTreePosition)
        let newTree = document.createElement('div')
        board.appendChild(newTree)
        newTree.style.left = newTreePosition[0] + '%'
        newTree.style.top = newTreePosition[1] + '%'
        newTree.classList.add('tree')
    }
    return treePositions
}

function isItemInArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] === item[0] && array[i][1] === item[1])
            return true
    }
    return false
}

function owlCreator(treePositions) {
    let startPosition = drawUniquePositions(treePositions)
    let element = document.createElement('div')
    element.classList.add('owl')
    board.appendChild(element)
    element.style.left = startPosition[0] + '%'
    element.style.top = startPosition[1] + '%'
    return element
}

function move(owl, treePositions, xMove, yMove, boundary) {
    let newPosition = [+owl.style.left.slice(0, -1) + xMove, +owl.style.top.slice(0, -1) + yMove]
    let owlOnTree = isItemInArray(treePositions, newPosition)
    if (xMove === 0) {
        owl.style.top = owl.style.top === boundary ?
            owl.style.top
            :
            (owlOnTree ? owl.style.top : +owl.style.top.slice(0, -1) + yMove + '%')
    }
    else if (yMove === 0) {
        owl.style.left = owl.style.left === boundary ?
            owl.style.left
            :
            (owlOnTree ? owl.style.left : +owl.style.left.slice(0, -1) + xMove + '%')
    }
    owlOnDiamond(owl)
}

function controls(event, owl, treePositions) {
    switch (event.key) {
        case ('ArrowUp'):
            move(owl, treePositions, 0, -5, '0%')
            break
        case ('ArrowRight'):
            move(owl, treePositions, 5, 0, '95%')
            break
        case ('ArrowDown'):
            move(owl, treePositions, 0, 5, '95%')
            break
        case ('ArrowLeft'):
            move(owl, treePositions, -5, 0, '0%')
            break
    }
}

function Diamond(treePositions) {
    this.init(treePositions)
    this.diamondRemove(treePositions)
}

Diamond.prototype.init = function (treePositions) {
    this.element = document.createElement('div')
    this.element.classList.add('diamond')
    this.position = drawUniquePositions(treePositions)
    this.element.style.left = this.position[0] + '%'
    this.element.style.top = this.position[1] + '%'
    board.appendChild(this.element)
}

Diamond.prototype.diamondRemove = function () {
    setTimeout(() => {
        this.element.remove()
    }, 5000)
}

function Fox(treePositions, owl) {
    this.init(treePositions)
    this.foxMove(treePositions, owl)
}

Fox.prototype.init = function (treePositions) {
    this.element = document.createElement('div')
    this.element.classList.add('fox')
    this.position = drawUniquePositions(treePositions)
    this.element.style.left = this.position[0] + '%'
    this.element.style.top = this.position[1] + '%'
    board.appendChild(this.element)
}

Fox.prototype.foxMove = function (treePositions, owl) {
    let foxRandomStep = () => {
        return Math.round(Math.random() * 2 - 1) * 5
    }
    let drawNoTreePositionFoxMove = (treePositions) => {
        let foxMoveXY = [foxRandomStep(), foxRandomStep()]
        let foxOnTree = isItemInArray(treePositions, [+this.element.style.left.slice(0, -1) + foxMoveXY[0], +this.element.style.top.slice(0, -1) + foxMoveXY[1]])
        return foxOnTree ? drawNoTreePositionFoxMove(treePositions) : foxMoveXY
    }
    return setInterval(() => {
        let foxStep = drawNoTreePositionFoxMove(treePositions)
        let foxLeft = this.element.style.left
        let foxTop = this.element.style.top
        this.element.style.left =
            (
                +foxLeft.slice(0, -1) + foxStep[0] > 95
                ||
                +foxLeft.slice(0, -1) + foxStep[0] < 0
            ) ?
            foxLeft
                :
                +foxLeft.slice(0, -1) + foxStep[0] + '%'
        this.element.style.top =
            (
                +foxTop.slice(0, -1) + foxStep[1] > 95
                ||
                +foxTop.slice(0, -1) + foxStep[1] < 0
            ) ?
            foxTop
                :
                +foxTop.slice(0, -1) + foxStep[1] + '%'

        this.position = [this.element.style.left, this.element.style.top]
        owlOnFox(owl)
    }, 700)
}

function owlOnFox(owl) {
    let actualFoxesPositions = []
    for (let i = 0; i < document.getElementsByClassName('fox').length; i++) {
        let foxesCounter = document.getElementsByClassName('fox')
        for (let i = 0; i < foxesCounter.length; i++)
            actualFoxesPositions[i] = [foxesCounter[i].style.left, foxesCounter[i].style.top]
        let owlOnFoxCheck = isItemInArray(actualFoxesPositions, [owl.style.left, owl.style.top])
        if (owlOnFoxCheck && !(points.immortal)) {
            blinkBoardColor("red")
            points.lifeDecrease()
        }
    }
}

function owlOnDiamond(owl) {
    let actualDiamond = document.getElementsByClassName('diamond')[0]
    if (actualDiamond !== undefined && (actualDiamond.style.left === owl.style.left) && (actualDiamond.style.top === owl.style.top)) {
        blinkBoardColor("blue")
        points.diamondsIncrease()
        let diamond = document.getElementsByClassName('diamond')[0]
        diamond.remove()
    }
}

function blinkBoardColor(setColor = "green") {
    board.style.boxShadow = setColor;
    setTimeout(() => board.style.backgroundColor = "green", 200)
}

let points = {
    immortal: false,
    life: 3,
    diamonds: 0,
    lifeDecrease: function () {
        if (this.life > 0) {
            --this.life
            let lifeIcons = document.querySelectorAll('.owlIcon')
            owls.removeChild(lifeIcons[lifeIcons.length - 1])
            // this.immortal = true
            // setTimeout(function () { this.immortal = false }, 1000)
        }
        else if (this.life === 0) {
            board.style.backgroundColor = "black"
            board.appendChild(start)
            start.innerHTML = "GAME&nbsp;OVER"
            document.removeEventListener('keydown', controls, false)
        }
    },
    diamondsIncrease: function () {
        ++this.diamonds
        scoreText.innerText = this.diamonds
    }
}

