const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const ul = document.querySelector('ul');

submit.addEventListener('click', onSubmit);

function onSubmit(e){

    e.preventDefault()
    if(input.value != ''){
    let li = document.createElement('li');
    li.className = 'collection-item purple lighten-3 flex-space';
    li.innerText = input.value;
    createEditBtn(li);
    createDeleteBtn(li);
    ul.appendChild(li);
    input.value = '';
    }

}

function createDeleteBtn(element){

    let deleteBtn = document.createElement('a');
    deleteBtn.setAttribute('href','#');
    deleteBtn.className = 'btn-warn yellow lighten-3';
    deleteBtn.innerText = 'x';
    element.appendChild(deleteBtn);

}

function createEditBtn(element){

    let editBtn = document.createElement('a');
    editBtn.setAttribute('href','#');
    editBtn.className = 'btn-edit blue lighten-3 ml-auto';
    editBtn.innerText = '✎';
    element.appendChild(editBtn);

}

function createValidateBtn(element){

    let validateBtn = document.createElement('a');
    validateBtn.setAttribute('href','#');
    validateBtn.className = 'btn-validate green lighten-3 ml-auto';
    validateBtn.innerText = '✓';
    element.appendChild(validateBtn);
    return validateBtn;

}

ul.addEventListener('click', onClick);

function onClick(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-warn')){
        e.target.parentElement.remove();
    }else if(e.target.classList.contains('btn-edit')){
        let li = e.target.parentElement;

        let val = String(li.innerText);
        val = val.substring(0, val.length-4);
        console.log(val);

        let input = document.createElement('input');
        input.id = 'temp-input';
        input.style.height = '30px';
        input.style.width = '220px';
        input.style.margin = '0px';
        input.style.padding = '0px';

        input.setAttribute('type', 'text');
        input.value = val;
        li.innerHTML = '';
        li.appendChild(input);
        let validateBtn = createValidateBtn(li);
        createDeleteBtn(li);
        console.log(li);

        validateBtn.addEventListener('click', validate);

        function validate(e){
            e.preventDefault();
            let finalVal = input.value;
            li.innerHTML = finalVal;
            createEditBtn(li);
            createDeleteBtn(li);
        }

    }
}



const clear = document.querySelector('#clear');

clear.addEventListener('click', e => {
    e.preventDefault();
    ul.innerHTML='';
});



