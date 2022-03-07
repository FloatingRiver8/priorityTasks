/* lista priorizada de tareas*/
let priorityValues = ['valor 10 vale más', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let eisenhowerChoices = ["¡A organizar!", "Importante/Urgente", "Importante/No urgente", "No importante/Urgente", "No importante/No urgente"];
let containerTasks = [];
let taskName;
let obtainEachPriority;
let priorityLevelForTask;
let priorityEisenhowerForTask;
let filtered1;
let ordList1;
let ordList2;
let ordList3;
let ordList4;


/* Escondo y hago aparecer los h1 y h3 */
$("h1, h3").hide();

$("h1").fadeIn(2000, function () {
    $("h3").slideDown(500)
        .delay(1000)
        .css({
            "font-size": "3.5rem"
        })
});
/* Obtengo los inputs y botones del dom */
const mainTaskList = $("#main__addTaskAndList");


/* CONSTRUCTOR del objeto tarea */
class Tasks {
    constructor(name, priorityNumber, priorityEisenhower) {
        this.name = name;
        this.priorityNumber = priorityNumber;
        this.priorityEisenhower = priorityEisenhower;

    }
}

//---------------------------------------------------------



//---------------------------------------------------------
/* Creo el Form con input para ingreso de tareas y botón input para submit. Append al main */
mainTaskList.append(`<form id = "my-Form">
<input type="text" placeholder="Ingresa tu tarea aquí" class="input-enterTask">
<select class = "myPriorityLevels"> </select>
<select class = "myEisenhowerChoices"></select>
<button type= "button" id="btn__sortList">Ordenar</button>
<button id="btn__ShowList">Mostrar todas las tareas</button>
</form>`);
const myForm = document.getElementById("my-Form");

//---------------------------------------------------------

/*  Obtengo entradas de INPUTS y SELECT */
obtainTaskName = document.querySelector(".input-enterTask");
obtainEachPriority = document.querySelector(".myPriorityLevels");
obtainEachEisenhower = document.querySelector(".myEisenhowerChoices");
let obtainBtnDelete = document.querySelector("#btn_delete1")
/* Obtengo Botón ordenar */
const btnSort = document.getElementById("btn__sortList");

/* Creo elemento OPTION para priority level recorriendo un array con los valores 
y lo ingreso dentro del Select previamente creado */
for (const val of priorityValues) {

    optionVal = document.createElement("option");
    obtainEachPriority.appendChild(optionVal);
    optionVal.setAttribute('class', 'mySelectOption');

    optionVal.innerHTML = `${val}`;
}

/* Creo los valores de las option  para del SELECT EISENHOWER */
for (const choice of eisenhowerChoices) {
    optionEisenhower = document.createElement("option");
    obtainEachEisenhower.appendChild(optionEisenhower);
    optionEisenhower.setAttribute('class', "myEisenhowerOption")

    optionEisenhower.innerHTML = choice;

}


/* Obtengo el ingreso de task por INPUT */
obtainTaskName.addEventListener("change", (e) => {
    taskName = obtainTaskName.value;

})


/* Obtengo el nivel de prioridad de SELECT */
obtainEachPriority.addEventListener("change", (event) => {
    priorityLevelForTask = Number(event.target.value);


})
/* Obtengo el nivel Eisenhower por SELECT */
obtainEachEisenhower.addEventListener("change", (e) => {
    priorityEisenhowerForTask = (e.target.value);
})

//**POSTIT**---------------------------------------------------------
/* CREO SECCIÓN para los "POST-IT" de Eisenhower" */
let sqareDiv


einsSection = document.createElement("section");
einsSection.setAttribute('id', 'einsSection')

/* Creo CADA "POST-IT" */
for (let [index, eachEisen] of eisenhowerChoices.entries()) {

    sqareDiv = document.createElement("div");
    sqareTitle = document.createElement("h2");
    sqareTitle.setAttribute('class', 'einsTitles')
    ordList = document.createElement("ol");
    ordList.setAttribute('id', `taskItems${index}`);

    mainTaskList.append(einsSection);
    einsSection.append(sqareDiv);
    sqareDiv.append(sqareTitle);
    sqareDiv.append(ordList);

    sqareDiv.setAttribute('id', `backgroundTaskList${index}`);
    sqareTitle.innerHTML = eachEisen;

}
//****-------------------------------



//****ANIMACIÓN---------------------------------------------------------
// Inicio sin los h2 de los "post-it"**/
$("h2").fadeOut();
//**------------------------------






//****BOTÓN ORDENAR evento-----------------------------------------------
/*  Ordena las tareas por orden de prioridad  */

let myNewNameKeyWithCounter;
let counter = 1;
btnSort.addEventListener("click", (e) => {
    document.querySelector('#taskItemsAllTasks').innerHTML = " ";
    /* Se debe seleccionar UNA OPCIÓN VÁLIDA de valores en cada select */
    if (taskName == undefined || priorityLevelForTask == undefined || priorityEisenhowerForTask == undefined) {
        alert("debe ingresar una tarea o seleccionar");
        return
    }

    /* Si se REPITE NOMBRE de una tarea, se le agrega un número con un contador */
    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {

            if (myArray[i].name === nameKey) {
                alert(`tarea ${nameKey} repetida, se añadirá un índice`);
                myArray[i].name = `${nameKey}${counter++}`;
                myNewNameKeyWithCounter = `${nameKey}${counter++}`;
            }

            if (myArray[i].name !== `${nameKey}${counter++}`) {
                counter = 1;
            }
        }
    }

    search(taskName, containerTasks);
    //****-------------------------------



    //***INSTANCIACIÓN---------------------------------------------------------
    /* Creo la instancia del objeto Task y borro el input  */
    containerTasks.push(new Tasks(taskName, priorityLevelForTask, priorityEisenhowerForTask));
    /* Borro el ingreso de la tarea del input */
    obtainTaskName.value = "";
    //****-------------------------------



    //**ORDENO PRIORITY---------------------------------------------------------   
    /*  las tareas se ordenan dependiendo del PRIORITYNUMBER donde 10 va primero que 1 */
    for (let i = 1; i <= containerTasks.length; i += 1) {

        if (i == containerTasks.length) {
            containerTasks.sort(function (a, b) {
                if (a.priorityNumber < b.priorityNumber) {
                    return 1;
                }
                if (a.priorityNumber > b.priorityNumber) {
                    return -1;
                }
            })
        }
    }
    //**-------------------------




    //**ANIMACIÓN---------------------------------------------------------
    /*  Una vez click en ordenar, APARECEN los TÍTULOS de los POST-IT  */

    $("h2").fadeIn("slow")
        .slideDown(2000);
    //**---------------------------




    //** FILTRA Por EISENHOWER--------------------------------------------
    /* Ordena las tareas según categoria Eisenhower */
    filtered1 = containerTasks.filter(function (element) {
        return element.priorityEisenhower == "Importante/Urgente";
    });


    const filtered2 = containerTasks.filter(function (element) {
        return element.priorityEisenhower == "Importante/No urgente";
    });

    const filtered3 = containerTasks.filter(function (element) {
        return element.priorityEisenhower == "No importante/Urgente";
    });


    const filtered4 = containerTasks.filter(function (element) {
        return element.priorityEisenhower == "No importante/No urgente";
    });
    //**---------------------------



    //** VACIAR LAS LISTAS-----------------------------------------------------
    /* Para que no se repitan los items añadidos anteriormente */
    document.querySelector('#taskItems1').innerHTML = " ";
    document.querySelector('#taskItems2').innerHTML = " ";
    document.querySelector('#taskItems3').innerHTML = " ";
    document.querySelector('#taskItems4').innerHTML = " ";
    /* document.querySelector('#taskItemsAllTasks').innerHTML = " "; */

    //**---------------------------


    //**LISTAR----------------------------------------------------------------
    /* Ubica las tareas en post-it DEPENDIENDO del FILTRO */

    function filtering(f1, f2, f3, f4) {

        //**FILTER 1-------------------------------------------------------
        for (let filter1 of f1) {
            /* Creo los elementos y guardo en variable */
            let divEisen = document.querySelector("#backgroundTaskList1");
            ordList1 = document.querySelector(`#taskItems1`)
            itemList1 = document.createElement("li");
            itemList1.setAttribute("id", `${filter1.name}`)
            /* Botón Delete */
            let btnDelete = document.createElement("button");
            btnDelete.setAttribute("class", "btn_delete1")
            btnDelete.setAttribute("id", `${filter1.name}`)
            /* Agrego cada elemento */
            divEisen.append(ordList1);
            ordList1.append(itemList1);
            ordList1.append(btnDelete);
            itemList1.innerHTML = ` ${filter1.name}`;

            /* Escucho los clicks en lista */
            divEisen.addEventListener("click", (e) => {

                if (e.target && e.target.classList.contains("btn_delete1")) {
                    const mY = e.target.id
                    /* Ejecuto la función Remove Item, le paso por parámetro el Id del target*/
                    removeItem(mY);
                    /* Borra la lista de todas las tareas*/
                    document.querySelector('#taskItemsAllTasks').innerHTML = " "


                    let eachliId = document.getElementById(`${filter1.name}`)

                    /* Si el id del LI coincide con el id del botón, borrar el item list y su botón. */
                    if (eachliId.id == e.target.id && btnDelete.id == e.target.id) {

                        eachliId.remove(eachliId.id);
                        btnDelete.remove(btnDelete.id);
                    }

                }
            })
        }
        //****-------------------------------


        //**FILTER 2------------------------------------------------------
        for (let filter2 of f2) {
            let divEisen2 = document.querySelector("#backgroundTaskList2");
            ordList2 = document.querySelector(`#taskItems2`);
            itemList2 = document.createElement("li");
            itemList2.setAttribute("id", `${filter2.name}`);

            /* Botón Delete */
            let btnDelete2 = document.createElement("button");
            btnDelete2.setAttribute("class", "btn_delete2")
            btnDelete2.setAttribute("id", `${filter2.name}`)

            divEisen2.appendChild(ordList2)
            ordList2.appendChild(itemList2);
            ordList2.append(btnDelete2);

            itemList2.innerHTML = ` ${filter2.name}`;

            /* clicks en lista */
            divEisen2.addEventListener("click", (e) => {


                if (e.target && e.target.classList.contains("btn_delete2")) {
                    const mY2 = e.target.id
                    removeItem(mY2);

                    document.querySelector('#taskItemsAllTasks').innerHTML = " "

                    let eachliId2 = document.getElementById(`${filter2.name}`)
                    /* Si el id del LI coincide con el id del botón, BORRARR ITEM LIST Y SU BOTÓN. */
                    if (eachliId2.id == e.target.id && btnDelete2.id == e.target.id) {
                        eachliId2.remove(eachliId2.id);
                        btnDelete2.remove(btnDelete2.id);

                    }


                }

            })
        }

        //****-------------------------------



        //**FILTER 3-------------------------------------------------------
        for (let filter3 of f3) {
            let divEisen3 = document.querySelector("#backgroundTaskList3");
            ordList3 = document.querySelector(`#taskItems3`);
            itemList3 = document.createElement("li");
            itemList3.setAttribute("id", `${filter3.name}`);

            /* Botón Delete */
            let btnDelete3 = document.createElement("button");
            btnDelete3.setAttribute("class", "btn_delete3");
            btnDelete3.setAttribute("id", `${filter3.name}`);


            divEisen3.append(ordList3);
            ordList3.append(itemList3);
            ordList3.append(btnDelete3);
            itemList3.innerHTML = ` ${filter3.name}`;


            /* clicks en lista */
            divEisen3.addEventListener("click", (e) => {
                if (e.target && e.target.classList.contains("btn_delete3")) {
                    const mY3 = e.target.id
                    removeItem(mY3);
                    document.querySelector('#taskItemsAllTasks').innerHTML = " "


                    let eachliId3 = document.getElementById(`${filter3.name}`)


                    /* Si el id del LI coincide con el id del botón, borrar el item list y su botón. */
                    if (eachliId3.id == e.target.id && btnDelete3.id == e.target.id) {

                        eachliId3.remove(eachliId3.id);
                        btnDelete3.remove(btnDelete3.id);
                    }


                }


            })

        }

        //****-------------------------------

        //**FILTER 4-------------------------------------------------------
        for (let filter4 of f4) {
            let divEisen4 = document.querySelector("#backgroundTaskList4");
            ordList4 = document.querySelector(`#taskItems4`)
            itemList4 = document.createElement("li");
            itemList4.setAttribute("id", `${filter4.name}`)
            /* Botón Delete */
            let btnDelete4 = document.createElement("button");
            btnDelete4.setAttribute("class", "btn_delete4")
            btnDelete4.setAttribute("id", `${filter4.name}`)


            divEisen4.append(ordList4);
            ordList4.append(itemList4);
            ordList4.append(btnDelete4);
            itemList4.innerHTML = ` ${filter4.name}`;


            /* clicks en lista */
            divEisen4.addEventListener("click", (e) => {


                if (e.target && e.target.classList.contains("btn_delete4")) {
                    const mY4 = e.target.id
                    removeItem(mY4);
                    document.querySelector('#taskItemsAllTasks').innerHTML = " "


                    let eachliId4 = document.getElementById(`${filter4.name}`)


                    /* Si el id del LI coincide con el id del botón, borrar el item list y su botón. */
                    if (eachliId4.id == e.target.id && btnDelete4.id == e.target.id) {

                        eachliId4.remove(eachliId4.id);
                        btnDelete4.remove(btnDelete4.id);
                    }


                }


            })

        }

        console.log(containerTasks);

    }

    filtering(filtered1, filtered2, filtered3, filtered4);

    //****-------------------------------



    //** Borrar Item de la lista---------------------------------------
    function removeItem(myName) {
        for (let i = 0; i < containerTasks.length; i++) {

            if (containerTasks[i].name == myName) {
                containerTasks[i].name
                containerTasks.splice(i, 1);
            }

        }
    }
    //**-------------------------
})

//** Mostrar todas las tareas-------------------------------------------
let sqareDivAllTasks = document.createElement("div");
let sqareTitleAllTasks = document.createElement("h2");
let ordListAllTasks = document.createElement("ol");



let itemListAllTasks = document.createElement("li");
einsSection.append(sqareDivAllTasks);
sqareDivAllTasks.append(sqareTitleAllTasks);
sqareDivAllTasks.append(ordListAllTasks);


sqareDivAllTasks.setAttribute('id', "backgroundTaskList5");
ordListAllTasks.setAttribute("id", "taskItemsAllTasks");

const showAllTasks = document.getElementById("btn__ShowList");
showAllTasks.addEventListener("click", (e) => {
    e.preventDefault()

    for (let allTasks of containerTasks) {

        let itemListAllTasks = document.createElement("li");
        itemListAllTasks.setAttribute("id", `${allTasks.name}`);
        ordListAllTasks.append(itemListAllTasks);


        /* Título */
        sqareTitleAllTasks.innerHTML = "Todas las tareas";
        /* Lista de tareas */
        itemListAllTasks.innerHTML = ` ${allTasks.name}`;
    }

})