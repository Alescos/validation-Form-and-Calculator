// --------constant-----------
const form = document.getElementById('form');
const inputs=form.querySelectorAll('#form input');

// confirmation flags for validation of each input
const campos ={
    id:false,
    name:false,
    phone:false,
    email:false,
    area:false,
    position:false,
    dateTime:false,
    location:false,
}
// --------------------Regular expressions--------------------
const expresiones={
    id: /^([0-9]){7,15}$/,
    strings: /^[a-zA-ZÀ-ÿ \u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
    number: /^([0-9 +]){10,12}$/,
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    dateTime: /([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?/g  
}

// -----------------Validation form function-------------------------

const validacionFormulario= (e)=>{
    switch (e.target.name){
        case "id":
            validacionCampo(expresiones.id, e.target, 'id');          
        break;
        case "fullName":
            validacionCampo(expresiones.strings, e.target,'name');
        break;
        case "phone":
            validacionCampo(expresiones.number, e.target,'phone');
        break;
        case "email":
            validacionCampo(expresiones.email, e.target,'email');
        break;
        case "area":
            validacionCampo(expresiones.strings, e.target,'area');
        break;
        case "position":
            validacionCampo(expresiones.strings, e.target,'position');
        break;
        case "location":
            validacionCampo(expresiones.strings, e.target,'location');
        break;
        case "dateTime":
            validacionCampo(expresiones.dateTime, e.target,'dateTime');
        break;
    }
}

// ----------------------Field validation------------------------------
/* 
@expresion:regular expression for testing
@input: target input when it's being written
@campo: name of the group to which the field belongs
*/
const validacionCampo=(expresion,input,campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(`group_${campo}`).classList.remove('form__group-incorrect');
        document.getElementById(`group_${campo}`).classList.add('form__group-correct');
        document.querySelector(`#group_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#group_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group_${campo} .form__input-error`).classList.remove('form__input-error-active');
        campos[campo]=true;
    }else{
        document.getElementById(`group_${campo}`).classList.add('form__group-incorrect');
        document.getElementById(`group_${campo}`).classList.remove('form__group-correct');
        document.querySelector(`#group_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#group_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group_${campo} .form__input-error`).classList.add('form__input-error-active');
        campos[campo]=false;
    }
}
// ---------------------Events------------------------

// -----Event for each of form inputs text----------

/* An event is added for each input text of the form that calls the 
validacionFormulario function  */

inputs.forEach((input)=>{
    input.addEventListener('keyup',validacionFormulario);     
});


// --------------submit button event---------------

/* Prevents the button's default event from firing and validates that
 the form meets all the conditions  */

form.addEventListener('submit',(e)=>{
    e.preventDefault();  
    if(campos.id && campos.name && campos.email && campos.phone && campos.dateTime && campos.area && campos.location && campos.position){
        form.reset();
        document.getElementById('form__message').classList.remove('form__message-active');
        document.getElementById('form__message-success').classList.add('form__message-success-active');
        setTimeout(()=>{
            document.getElementById('form__message-success').classList.remove('form__message-success-active');
        },3000);

        document.querySelectorAll('.form__group-correct').forEach((icon)=>{
            icon.classList.remove('form__group-correct');
        });
    }else{
        document.getElementById('form__message').classList.add('form__message-active');
    }
});