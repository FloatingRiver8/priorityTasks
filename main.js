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

/* Obtendo los inputs y botones del dom */
const mainTaskList = $("#main__addTaskAndList");


/* CONSTRUCTOR del objeto tarea */
class Tasks {
    constructor(name, priorityNumber, priorityEisenhower) {
        this.name = name;
        this.priorityNumber = priorityNumber;
        this.priorityEisenhower = priorityEisenhower;

    }
}


/* Creo el Form con input para ingreso de tareas y botón input para submit. Append al main */
mainTaskList.append(`<form id = "my-Form">
<input type="text" placeholder="Ingresa tu tarea aquí" class="input-enterTask">
<select class = "myPriorityLevels"> </select>
<select class = "myEisenhowerChoices"></select>
<input type ="submit" id="sending">
<button type= "button" id="btn__sortList">Ordenar</button>
</form>`);
const myForm = document.getElementById("my-Form");



/*  Obtengo entradas de INPUTS y SELECT */
obtainTaskName = document.querySelector(".input-enterTask");
obtainEachPriority = document.querySelector(".myPriorityLevels");
obtainEachEisenhower = document.querySelector(".myEisenhowerChoices");
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


/* Creo la INSTANCIA del objeto TASKS con los ingresos */
myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    containerTasks.push(new Tasks(taskName, priorityLevelForTask, priorityEisenhowerForTask));
    console.log(containerTasks);
    obtainTaskName.value = "";

})


let divEisen = document.querySelector("#backgroundTaskList1");


let sqareDiv
/* CREO SECCIÓN para los "POST-IT" de Eisenhower" */
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



/* ANIMACIÓN Inicio sin los h2 de los "post-it" */
$("h2").fadeOut();


/* **BOTÓN ORDENAR evento**
 Ordena las tareas por orden de prioridad */
btnSort.addEventListener("click", () => {


            /* ORDENO las tareas dependiendo del PRIORITYNUMBER donde 10 va primero que 1 */
            for (let i = 1; i <= containerTasks.length; i++) {

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



            /* Una vez click en ordenar, APARECEN los TÍTULOS de los POST-IT */

            $("h2").fadeIn("slow")
                .slideDown(2000);

            /* FILTRA los resultados de las tareas que contengan "Importante/No urgente" */
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






            /* Vaciar las listas para que no se repitan los items añadidos anteriormente */
            document.querySelector('#taskItems1').innerHTML = " ";
            document.querySelector('#taskItems2').innerHTML = " ";
            document.querySelector('#taskItems3').innerHTML = " ";
            document.querySelector('#taskItems4').innerHTML = " ";

            /* LISTAR tareas en post-it DEPENDIENDO del FILTRO */

            function filtering(f1, f2, f3, f4) {

                for (let filter1 of f1) {

                    let divEisen = document.querySelector("#backgroundTaskList1");
                    console.log(ordList1 = document.querySelector(`#taskItems1`))
                    itemList1 = document.createElement("li");

                    divEisen.append(ordList1);
                    ordList1.append(itemList1);
                    itemList1.innerHTML = ` ${filter1.name},
                        NP: ${filter1.priorityNumber}, I/U`;


                }



                for (let filter2 of f2) {

                    let divEisen2 = document.querySelector("#backgroundTaskList2");
                    console.log(ordList2 = document.querySelector(`#taskItems2`))
                    itemList2 = document.createElement("li");

                    divEisen2.appendChild(ordList2)
                    ordList2.appendChild(itemList2);

                    itemList2.innerHTML = ` ${filter2.name},
                    NP: ${filter2.priorityNumber}, I/NU`;

                }


                for (let filter3 of f3) {

                    let divEisen3 = document.querySelector("#backgroundTaskList3");
                    console.log(ordList3 = document.querySelector(`#taskItems3`))
                    itemList3 = document.createElement("li");

                    divEisen3.appendChild(ordList3)
                    ordList3.appendChild(itemList3);

                    itemList3.innerHTML = `${filter3.name},
                    NP: ${filter3.priorityNumber}  I/NU`;

                }


                for (let filter4 of f4) {

                    let divEisen4 = document.querySelector("#backgroundTaskList4");
                    console.log(ordList4 = document.querySelector(`#taskItems4`))
                    itemList4 = document.createElement("li");

                    divEisen4.appendChild(ordList4)
                    ordList4.appendChild(itemList4);

                    itemList4.innerHTML = `${filter4.name},
                    NP: ${filter4.priorityNumber}, NI/NU`;

                };

            };




            filtering(filtered1, filtered2, filtered3, filtered4);

            })