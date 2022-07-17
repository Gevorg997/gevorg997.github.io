"use strict"
console.log('js works')
const container = document.getElementById('container');
const xCount = 15;
const yCount = 10;
let counter = 0
let isRotatable = true
let landingFigure
const reachedRow = {
    0: ['15'],
    1: ['15'],
    2: ['15'],
    3: ['15'],
    4: ['15'],
    5: ['15'],
    6: ['15'],
    7: ['15'],
    8: ['15'],
    9: ['15'],
}

const reachedCol = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
}


const iTet = [
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0]
]

const lTet = [
    [1,1,0],
    [1,0,0],
    [1,0,0]
]

const zTet = [
    [1,0,0],
    [1,1,0],
    [0,1,0]
]

const oTet = [
    [1,1],
    [1,1]
]

const tTet = [
    [1,1,1],
    [0,1,0],
    [0,0,0]
]

const LTet = [
    [1,1,1],
    [1,0,0],
    [0,0,0]
]

const ZTet = [
    [0,1,0],
    [1,1,0],
    [1,0,0]
]

const figure = [iTet,lTet,zTet,oTet,tTet,LTet,ZTet]

let rand = Math.floor(5 * Math.random()) 
let currentFigure = figure[rand]

function drawBoard() {
    for (let i = 0; i < xCount; i++) {
        for (let j = 0; j < yCount; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.i = i;
            cell.dataset.j = j;
            container.append(cell);
        }
    }
}

drawBoard();

const cells = container.getElementsByClassName('cell')

drawFigure(currentFigure)

let timerId = setInterval(moveDown,750)

function moveDown() {
    let winningRow = []
    let someoneReached = false
    const activeEls = document.getElementsByClassName('active');

    for(var k = activeEls.length-1 ; k >= 0 ; k-- ){
        var tempEl = activeEls[k]

           if(reachedRow[tempEl.getAttribute('data-j')].includes(+tempEl.getAttribute('data-i') + 1 + '')){
            someoneReached = true
            break
        }
    }

        for(var i = activeEls.length-1 ; i >= 0 ; i-- ){
        const activeEl = activeEls[i]
        
        if(someoneReached){
            activeEl.classList.remove('active'); 
            activeEl.classList.add('reached');
            reachedRow[activeEl.getAttribute('data-j')] = reachedRow[activeEl.getAttribute('data-j')].concat(activeEl.getAttribute('data-i'))
            //activeEl.getAttribute('data-i') - 1
            if(reachedRow[activeEl.getAttribute('data-j')].includes('0')){
                alert('Game Over')
                clearInterval(timerId)
                return
              }  

              reachedCol[activeEl.getAttribute('data-i')] = reachedCol[activeEl.getAttribute('data-i')].concat(activeEl.getAttribute('data-j'))

              if(reachedCol[activeEl.getAttribute('data-i')].length == 10 ){
                
                winningRow.push(activeEl.getAttribute('data-i'))
              }
            
             
             if(i == 0){
                if(winningRow[0]){
                    let rowCount = 0
                    for(let w of winningRow){
                        winner(+w + rowCount + '' )
                        rowCount++
                    }
                   
                  }
                rand = Math.floor(5 * Math.random()) 
                currentFigure = figure[rand]
                drawFigure(currentFigure)
              }
            continue
        } else {
            activeEl.classList.remove('active');
            const nextEl = document.querySelectorAll(`div[data-i="${+activeEl.dataset.i + 1}"]`)[+activeEl.dataset.j];
            nextEl.classList.add('active');
   }    
             
       }   
 }
   

function moveRight() {
    
    const activeEls = document.getElementsByClassName('active');

    for(var k = activeEls.length-1 ; k >= 0 ; k-- ){
        var tempEl = activeEls[k]
        if(tempEl.getAttribute('data-j') == yCount-1 || reachedCol[tempEl.getAttribute('data-i')].includes(+tempEl.getAttribute('data-j') + 1 + '')){
            return
        }
    }


    for(var i = activeEls.length-1 ; i >= 0 ; i-- ){
        const activeEl = activeEls[i]
        activeEl.classList.remove('active');
        const nextEl = document.querySelectorAll(`div[data-j="${+activeEl.dataset.j + 1}"]`)[+activeEl.dataset.i];
        nextEl.classList.add('active');

}
}

function moveLeft() {

    const activeEls = document.getElementsByClassName('active');

    for(var k = activeEls.length-1 ; k >= 0 ; k-- ){
        var tempEl = activeEls[k]
        if(tempEl.getAttribute('data-j') == 0 || reachedCol[tempEl.getAttribute('data-i')].includes(+tempEl.getAttribute('data-j') - 1 + '')){
            return
        }
    }


    for(var i = activeEls.length-1 ; i >= 0 ; i-- ){
           const activeEl = activeEls[i] 
   
        if(activeEl.classList.contains('twice')){
            activeEl.classList.remove('twice')
        } else {
            activeEl.classList.remove('active')
        }
       
       const nextEl = document.querySelectorAll(`div[data-j="${+activeEl.dataset.j - 1}"]`)[+activeEl.dataset.i];
           if(nextEl.classList.contains('active')) {
               nextEl.classList.add('twice')
           } else {
               nextEl.classList.add('active');
           }
   }
   }


function drawFigure(fig , i = 4){
    
    let acts = []
    let cols = []
    for (let m = 0 ; m < fig.length; m++) {
        for (let n = 0; n < fig[m].length; n++) {
            if(fig[m][n]){
                cols.push([cells[i].getAttribute('data-j')])
                
                acts.push(cells[i])
                if(cells[i].classList.contains('active')){
                    isRotatable = false
                    return
                }
            }
            i++
        }
        i += yCount - fig.length
    }
    for(let p = 0; p < cols.length; p++){
        if((+cols[p]+1) % 10 === 0 && p !== cols.length-1){
            isRotatable = false
            return
        }
        
    }
    

 
   acts.forEach(el => el.classList.add('active'))
   
}

function rotateArr(ar){
    let rot = []
    let m = ar.length - 1
    for(let j = 0; j <= m; j++){
        let ar1 = []
        for (let i = m; i >= 0; i--) {
            ar1 = ar1.concat(ar[i][j])
        }
        rot.push(ar1)
    }
    return rot
}

function rotate (){
    debugger
    if(currentFigure == oTet){
        return
    }
    isRotatable = true
    let actives = []
    
    const activeEls = document.getElementsByClassName('active')
     const len = activeEls.length
    const tempEl = activeEls[0];
    const ind = 10 * tempEl.getAttribute('data-i') + +tempEl.getAttribute('data-j') - counter%2
    counter++
    
    for (let i = 0; i < len; i++) {
        let activeEl = activeEls[0]
        activeEl.classList.remove('active')
        actives.push(activeEl)
    }
    currentFigure= rotateArr(currentFigure)
    drawFigure(currentFigure,ind)
    if(!isRotatable){
        for (let p = 0; p < actives.length; p++) {
            
            actives[p].classList.add('active')
        }
    }
}

function winner (row){
    
    for (let i = +row; i >= 0; i--) {
        let count = 10
        let j = i + ''
        if(j == row){
            const winningRow = container.querySelectorAll(`div[data-i='${j}']`)
                for(let wr in winningRow){
                    winningRow[wr].classList.remove('reached') 
                    let wri = winningRow[wr].getAttribute('data-j')
                    reachedCol[j].splice(reachedCol[j].indexOf(wri),1)
                    reachedRow[+wri].splice(reachedRow[+wri].indexOf(j),1)
                    count--
                    if(!count){
                        break
                    }
                    
                     
                }
         } else {
            
            const currentRow = container.querySelectorAll(`div[data-i='${j}']`)
                for(let cr in currentRow){
                    if(currentRow[cr].classList.contains('reached')){
                        let nr = i + 1 + '' 
                        let cri = currentRow[cr].getAttribute('data-j') 
                        let nextRowCell = container.querySelector(`div[data-i='${nr}'][data-j='${cri}']`)
                        nextRowCell.classList.add('reached')
                        reachedCol[+nr].push(cri)
                        reachedRow[+cri].push(nr)
                        currentRow[cr].classList.remove('reached')
                        reachedCol[j].splice(reachedCol[j].indexOf(cri),1)
                        reachedRow[+cri].splice(reachedRow[+cri].indexOf(j),1)
                        
                    }
                      count--
                        if(!count){
                            break
                        }
                    }

        }
    }
}


window.addEventListener('keydown', (e) => {   
    if (e.key === 'ArrowDown') {
        moveDown();
    }
})

window.addEventListener('keydown', (e) => {    
    if (e.key === 'ArrowRight') {
        moveRight();
    }
})



window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveLeft();
    }
})

window.addEventListener('keydown', (e) =>{
    if (e.key === 'ArrowUp') {
        rotate();
    }
})
