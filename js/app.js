let form = document.querySelector('.form-add');
let search = document.querySelector('.search');
let input = document.querySelector('.input-add');
let ul = document.querySelector('.list');
let ulRemove = document.querySelector('.listRemove');
let audio = document.querySelector('.audio');
let sound = document.querySelector('.sound');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    todoList();
})

// create list
let arr = [];
function todoList () {
    let inputValue = input.value;
    if(inputValue != ''){
        let li = document.createElement('li');
        li.classList.add('list-group-item','shadow','p-0', 'ps-3', 'd-flex', 'justify-content-between', 'align-items-center');
        let content = 
            `
                <p class="text m-0">${inputValue}</p>
                <button type="button" class="btn btn-danger">X</button>   
            `
        li.innerHTML = content;
        ul.appendChild(li);
        input.value = ''
        return arr.push(inputValue);
    }
}

// search list
search.addEventListener('keypress', function (e) {
    let inputVal = e.target.value;

    let li = document.querySelector('.list-group-item')
    let text = document.querySelector('.text');
    let btn = document.querySelector('.btn-danger');

    let filterValue = arr.filter(val => {
        return val.includes(inputVal);
    })
    
    ul.innerHTML = '';  
    filterValue.forEach(search => {
        text.textContent = search;
        li.appendChild(text);
        li.appendChild(btn);
        ul.appendChild(li);
        input.value = ''
    })
    
})

// sound function
function successSound () {
    return audio.play();
}

function successSoundOff () {
    audio.pause();
    return audio.currentTime = 0;
}

function restoreSound () {
    return sound.play();
}

function restoreSoundOff () {
    sound.pause();
    return sound.currentTime = 0;
}

//delete list
ul.addEventListener('click', function (e) {
    const target = e.target;

    if(target.classList.contains('btn')){

        target.classList.remove('btn-danger');
        target.classList.add('btn-success');
        target.textContent = 'Restore';
        target.style.color = 'white';

        let li = target.parentElement;
        li.style.textDecoration = 'line-through';

        if(confirm("Malumot rostdanham o'chirilsinmi ?")){

            ul.removeChild(li);
            ulRemove.appendChild(li);
            restoreSoundOff();
            successSound();

            // restore list
            ulRemove.addEventListener('click', function (r) {
                const del = r.target;

                if(del.classList.contains('btn')){

                    del.classList.remove('btn-success');
                    del.classList.add('btn-danger');        
                    del.textContent = 'X';
                    del.style.color = 'white';

                    let elLi = del.parentElement;
                    elLi.style.textDecoration = 'none';

                    ulRemove.removeChild(elLi)
                    ul.appendChild(elLi)
                    successSoundOff();
                    restoreSound();
                }

            })
        }else{
            target.classList.remove('btn-success');
            target.classList.add('btn-danger');
            target.textContent = 'X';
            target.style.color = 'white';
            li.style.textDecoration = 'none';
        }
    }
})