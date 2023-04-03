//============Define-UI-Vars============//

const input = document.querySelector("#input");
const submitBtn = document.querySelector("#submit");
const filterInput = document.querySelector("#filter");
const ul = document.querySelector(".collection");
const clearBtn = document.querySelector("#clear");


//maybe not necessary
const taskList = getTextFromList();
//==========Add-Task===============//

submitBtn.addEventListener("click", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if (input.value == "") {
    Snackbar.show({
      text: "Please Enter Some Text",
      actionTextColor: "#ff0000",
      pos: "top-center",
    });
  } else {
    taskList.push(input.value);
    let li = createLi(input.value);
    li.appendChild(createEditBtn());
    li.appendChild(createDeleteBtn());
    ul.appendChild(li);
    input.value = "";
  }

  return false;
}

//===========ul-Events===============//

ul.addEventListener("click", onClick);

function onClick(e) {
  e.preventDefault();

  //==============Delete-Button===============//

  if (e.target.classList.contains("btn-warn")) {
    if(confirm('Are You Sure You Want To Delete This ?'))
    e.target.parentElement.remove();
    //==============Edit-Button===============//
  } else if (e.target.classList.contains("btn-edit")) {
    let li = e.target.parentElement;

    let val = String(li.innerText);
    val = val.substring(0, val.length - 4);

    let input = document.createElement("input");
    input.id = "temp-input";
    
    input.setAttribute("type", "text");
    input.value = val;
    li.innerHTML = "";
    li.appendChild(input);
    let validateBtn = createValidateBtn();
    li.appendChild(validateBtn);
    li.appendChild(createDeleteBtn());

    //======Validate-Button-(inside-edit-button)=========//
    validateBtn.addEventListener("click", validate);

    function validate(e) {
      e.preventDefault();
      let finalVal = input.value;
      li.innerHTML = finalVal;
      li.appendChild(createEditBtn());
      li.appendChild(createDeleteBtn());
    }
  }
}

//===============Filter-Input================//

filterInput.addEventListener("keyup", onInputFilter);

function onInputFilter(e) {
  
  let filterText = e.target.value.toLowerCase();
  console.log(filterText);
  document.querySelectorAll('.collection-item').forEach(element => {
    if (element.innerText.toLowerCase().includes(filterText)) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });

  return false;


/* bad code :'/
  if (filterText != "") {
    clearList();
    for (let i = 0; i < taskList.length; i++) {
      const liText = taskList[i];
      if (liText.toLowerCase().includes(filterText)) {
        let li = createLi(liText);
        li.appendChild(createEditBtn());
        li.appendChild(createDeleteBtn());
        console.log(li);
        ul.appendChild(li);
      }
    }
  } else {
    for (let i = 0; i < taskList.length; i++) {
      const liText = taskList[i];
      let li = createLi(liText);
      li.appendChild(createEditBtn());
      li.appendChild(createDeleteBtn());
      console.log(li);
      ul.appendChild(li);
    }
  }
  */
}

//========Clear-Button============//

clearBtn.addEventListener("click", e => {
  if(confirm('Are You Sure You Want To Clear The List ?'));
  clearList();
});

//========Reusable-Functions============//

function createLi(text) {
  let li = document.createElement("li");
  li.className = "collection-item purple lighten-3 flex-space";
  li.innerText = text;
  return li;
}

function createDeleteBtn() {
  let deleteBtn = document.createElement("a");
  deleteBtn.setAttribute("href", "#");
  deleteBtn.className = "btn-warn yellow lighten-3";
  deleteBtn.innerText = "x";
  return deleteBtn;
}

function createEditBtn() {
  let editBtn = document.createElement("a");
  editBtn.setAttribute("href", "#");
  editBtn.className = "btn-edit blue lighten-3 ml-auto";
  editBtn.innerText = "✎";
  return editBtn;
}

function createValidateBtn() {
  let validateBtn = document.createElement("a");
  validateBtn.setAttribute("href", "#");
  validateBtn.className = "btn-validate green lighten-3 ml-auto";
  validateBtn.innerText = "✓";
  return validateBtn;
}

function clearList() {
  //e.preventDefault();
  //ul.innerHTML='';
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function getTextFromList() {
  let textArr = Array();

  let length = ul.children.length;
  let val = "";

  for (let i = 0; i < length; i++) {
    val = String(ul.children[i].innerText);
    val = val.substring(0, val.length - 4);
    textArr.push(val);
  }

  return textArr;
}
