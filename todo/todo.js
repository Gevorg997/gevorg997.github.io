

var div1 = document.getElementById('div1');
var button = document.getElementById("button");
var input = document.getElementById("input");
var i = 1;
button.addEventListener('click', adder)

function adder(){
    if(!input.value){
        return
    }
    var do1 = document.createElement('div');
    do1.append(input.value);
    do1.classList.add('do' + i)
    do1.classList.add('doo')
    var b1 = document.createElement('button');
    b1.classList.add('butt')
    b1.innerHTML = 'Done'
    b1.classList.add('but' + i)
    b1.addEventListener('click',remover)
    do1.append(b1)
    div1.append(do1);
    input.value = '';
    i++
}

function remover(e){
    let j = +e.target.classList['1'][e.target.classList['1'].length-1]
    let doc = document.getElementsByClassName('do' + j)['0']
    doc.classList.add('hidden')
    
}