document.addEventListener('DOMContentLoaded', () => {
    let i = 0;
    document.querySelector('.inputTareas').addEventListener('keyup', event => {
        if (event.keyCode === 13) { //Enter tiene el código 13. Que actúe solo en caso de presionar Enter.

            //CREAMOS TAREAS:

            let tarea = document.createElement('div'); //Creamos el div.
            tarea.className = 'tarea';
            let titulo = document.createElement('h3'); //Creamos el titulo dela tarea. Es un h3
            titulo.className = "titulo";
            let botones = document.createElement('div'); //Separo los botones del texto, con un div exclusivo para botones.
            botones.className ="botones";
            titulo.innerText = event.target.value; //Metemos lo de dentro de inputTareas en el h1  que hemos creado.

            if (titulo.innerText === "") { //si la entrada de texto es una string vacía, se genera automáticamente una tarea llamada Task1. 
                i++;
                event.target.value = `Task${i}`;
            } else {
                document.querySelector('.tareas').appendChild(tarea); //Añades la tarea al DOM.
                event.target.value = ""; //Borramos el .inputTareas cada vez que le damos al Enter.

                //CREAMOS BOTON PARA INDICAR QUE LA TAREA ESTA COMPLETA

                let complettedButton = document.createElement('div');
                complettedButton.className = "complettedButton";
                complettedButton.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">check_box_outline_blank</i></button>';
                complettedButton.classname = 'complettedButton';
                complettedButton.addEventListener('click', event => {
                    if (complettedButton.innerHTML === '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">check_box_outline_blank</i></button>') {
                        complettedButton.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">check_box</i></button>';
                    } else {
                        complettedButton.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">check_box_outline_blank</i></button>';
                    }

                    tarea.classList.toggle('completed'); //Que cuando le de al botón de completar vaya al padre y le cambie la clase a 'completed', que definiremos en el css. Con el toggle, cada vez que le volvemos a dar cambiamos la tarea a no completada.
                })
                let titYbtn = document.createElement('div');
                titYbtn.className = 'titYbtn';
                tarea.appendChild(titYbtn);
                titYbtn.appendChild(titulo);
                titYbtn.appendChild(botones);
                botones.appendChild(complettedButton);

                //CREAMOS BOTONES PARA BORRAR TAREAS

                let deleteButton = document.createElement('div');
                deleteButton.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">delete</i></button>';
                deleteButton.addEventListener('click', event => {
                    tarea.remove();
                })
                botones.appendChild(deleteButton);
                document.querySelector('.tareas').appendChild(tarea);

                //CREAMOS BOTÓN PARA EDITAR EL TÍTULO DE LA TAREA


                titulo.addEventListener('dblclick', event => {
                    event.target.setAttribute('contenteditable', 'true'); //Que el titulo de la tarea se pueda editar
                    event.target.focus();

                    titulo.addEventListener('keydown', event => { //keydpwn porque va antes del keyup
                        if (event.keyCode === 13) {
                            event.target.removeAttribute("contenteditable") //Le quitamos el atributo editable para que no haga el enter= cambio de linea
                            event.target.blur() //simlemente quitamos el foco , no hace falta asignar valores
                        }
                    })
                })

                //CREAMOS BOTÓN PARA VENTANA MODAL 
                let fondoModal = document.createElement('div');
                fondoModal.className = 'fondoModal';
                let Modal = document.createElement('div');
                Modal.className = 'Modal';
                document.body.append(fondoModal, Modal)
                fondoModal.addEventListener('click',()=>{
                    fondoModal.style.display = "none";
                    Modal.style.display = "none";
                })
                let closeButton = document.createElement('div');4
                closeButton.className ='closeButton';
                closeButton.innerHTML ='<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">clear</i></button>';
                Modal.appendChild(closeButton);
                closeButton.addEventListener('click', () =>{
                    fondoModal.style.display = "none";
                    Modal.style.display = "none";
                })
                let description = document.createElement('div');
                description.className = 'description';
                Modal.appendChild(description);
                let descriptionTitle = document.createElement('h4');
                descriptionTitle.innerText = "Descripción de la tarea";
                description.appendChild(descriptionTitle);
                let descriptionButton = document.createElement('div');
                descriptionButton.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">add</i></button>';
                
                let inputDescription = document.createElement('textarea');
                inputDescription.className = "inputDescription";
                description.appendChild(inputDescription);
                let sendButton = document.createElement('div');
                sendButton.innerHTML = '<button class="mdl-button mdl-js-button">Done</button>';
                let btnDescription = document.createElement('div');
                btnDescription.className = "btnDescription";
                description.appendChild(btnDescription);
                btnDescription.appendChild(sendButton);
                inputDescription.setAttribute('placeholder', 'Descripción de la tarea...');


                sendButton.addEventListener('click', event => {
                    //Qué hace cuando se escribe una descripción
                    sendButton.style.display = "none";
                    inputDescription.blur()
                    event.target.style.display = "none";
                    

                    if (inputDescription.value === "") {
                        alert("Debes redactar una descripción");
                        //Si no se introduce ninguna descripción y se presiona enter --> mensaje de alerta, para no meter descripción en blanco.
                    }

                    let deleteButton = document.createElement('div');
                    deleteButton.innerHTML = '<button class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">delete</i></button>';
                    deleteButton.addEventListener('click', event => {
                        inputDescription.value = '';
                        
                    })
                    btnDescription.appendChild(deleteButton);

                    let count = 0;
                    inputDescription.addEventListener('dblclick', event => {
                        //EDITAR LA DESCRIPCIÓN
                        inputDescription.setAttribute('contenteditable', 'true');
                        inputDescription.focus();
                        let editButton = document.createElement('div');
                        editButton.innerHTML = '<button class="mdl-button mdl-js-button">EDIT</button>';
                        count ++;
                        if (count < 2){
                            btnDescription.appendChild(editButton);
                        }
                        
                        editButton.addEventListener('click', event => {
                            inputDescription.blur()
                            event.target.style.display = "none";
                            count = 0;

                        })
                    })
                })

                descriptionButton.addEventListener('click', event => {
                    fondoModal.style.display = "block";
                    Modal.style.display = "block";
                    
                })
                botones.appendChild(descriptionButton);
                document.querySelector('.tareas').appendChild(tarea);
            }
        }
    })
    document.querySelector('.inputTareas').addEventListener('focus', event => {
        event.target.placeholder = "";
    })
    document.querySelector('.inputTareas').addEventListener('blur', event => { //Si has quitado el placeholder cuando clickees fuera vuelve a aparecer
        event.target.placeholder = "Añadir tarea...";
    })
})