
// losowa pozycja sowy
// losowa pozycja lisa
// losowa pozycja diamentow

// kierowanie sowa

document.addEventListener('keydown', function(event){
    const keyName = event.key;
    if(keyName === 'ArrowUp')
})

// trees auto-generator
var treePositions = [];
for(var i = 0; i<99; i++){
    window['treeXY'+i] = [Math.floor(Math.random()*19), Math.floor(Math.random()*19)]
    treePositions.push(window['treeXY'+i]);
    window['tree'+i] = document.createElement('div');
    board.appendChild(window['tree'+i]);
    window['tree'+i].style.left = window['treeXY'+i][0]*5+'%';
    window['tree'+i].style.top = window['treeXY'+i][1]*5+'%';
    window['tree'+i].classList.add('tree')}

/************************************************/