// ----------------constant------------
const calculator=document.getElementById('calculator');
const calculator_btn=calculator.querySelectorAll('#calculator button');
const screen=document.getElementById('screen');

// ------------variables------------

let value1="";
let value2="";
let value3=0;
let operationName="";
let operation="";
let result=0;



// ----------------operations-------------
/* 
@val1: first operator
@val2: second operator
@value3: Operation result between @val1 and @val2
 */

function division(val1,val2){
    clear();
    if(val2!=0){
        value3=val1/val2;
        
        return value3;
    }else{
        return ('SyntaxError');
    }
}

function producto(val1,val2){
    value3=val1*val2;
    clear();
    return value3;
}

function suma(val1,val2){
    value3=val1+val2;
    clear();
    return value3;
}

function resta(val1,val2){
    value3=val1-val2;
    clear();
    return value3;
}

function clear(){
    value1=value2=operation="";
    screen.textContent=" ";
}



// ----------------Events-----------------------
/* 
add an event for each button and store the values of each button 
and then operate them according to the selected operation
 */
calculator_btn.forEach(button => {
    button.addEventListener('click',()=>{
        let digit=parseInt(button.value)
        if( !isNaN(digit)){
            if (operation=="") {
                if (!value1) {
                    clear();
                }
                value1+=button.value;
                screen.textContent=" ";
                screen.textContent+=value1;
            }else{
                value2+=button.value;
                screen.textContent=" ";
                screen.textContent=value1+operationName+value2
            }
        }
        else{
            if (button.value!="calcular") {
                operation=button.value;
                operationName=button.name;
                screen.textContent+=operationName;
                if (operation=="clear") {
                    clear();
                }
            }else{
                value1=parseInt(value1);
                value2=parseInt(value2);
                result=window[operation](value1,value2);
                screen.textContent=result;
            }

        }
    });
});