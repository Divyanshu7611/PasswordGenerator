const displayPass = document.querySelector("[data-passwordDisplay]");
const copiedbtn = document.querySelector("[data-copy]");
const copiedclick = document.querySelector("[copiedText]");
const count = document.querySelector("[data-lengthNum]");
const slider = document.querySelector("[sliderBar]");
const checkUpper = document.querySelector("#uppercase");
const checkLower  = document.querySelector("#lowercase");
const checkNumber = document.querySelector("#numbers");
const checkSymbols  = document.querySelector("#symbols");
const strengthcol = document.querySelectorAll("[strength-color]");
const GenPass = document.querySelector("[Genrate-Pass]");
const Allcheck = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
// intitially

let Password = "";
let checkcount = 0;
let PasswordLength = 10;
handleSlider();

function handleSlider(){
    slider.value = PasswordLength;
    count.innerText = PasswordLength;

}
// set indicator color
function Setcolor(color){
    strengthcol.style.backgroundColor = color;
}
// randominteger
function getRndInteger(min,max){
         return Math.floor((Math.random)*(max - min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
// funcition gemration alphabet
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperrCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
// random symbols
function generateSymbol(){
    const Randomsy = getRndInteger(0,symbols.length)
    return symbols.charAt(Randomsy);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (checkUpper.checked) hasUpper = true;
    if (checkLower.checked) hasLower = true;
    if (checkNumber.checked) hasNum = true;
    if (checkSymbols.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        Setcolor("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
        Setcolor("#ff0");
    } else {
        Setcolor("#f00");
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(data-passwordDisplay.value)
        copiedclick.innerHTML = "copied";
        
    }
    catch(e){
        copiedclick.innerHTML = "Failed";
    }
    copiedclick.classList.add("active"); 
    setTimeout( () => {
        copiedclick.classList.remove("active");
    },2000);


}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handlecheckbox(){
    checkcount = 0;
    Allcheck.forEach((checkbox)=>{
      if(Allcheck.checked){
        checkcount++;
      }
    });

    if(PasswordLength < checkcount){
        PasswordLength = checkcount;
        handleSlider(); 
    }
}

Allcheck.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckbox);
})

slider.addEventListener('input',(e)=>{
    PasswordLength = e.target.value;
    handleSlider();
})
copiedbtn.addEventListener('click',()=>{
    if(displayPass.value)
        copyContent();
    
})

GenPass.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(PasswordLength < checkCount) {
        PasswordLength = checkCount;
        handleSlider();
    }


  //remove old password
  Password = "";

  let funcArr = [];

  if(checkUpper.checked)
      funcArr.push(generateUpperrCase);

  if(checkLower.checked)
      funcArr.push(generateLowerCase);

  if(numbersCheck.checked)
      funcArr.push(generateRandomNumber);

  if(symbolsCheck.checked)
      funcArr.push(generateSymbol);

  //compulsory addition
  for(let i=0; i<funcArr.length; i++) {
      Password += funcArr[i]();
  }
  console.log("COmpulsory adddition done");

  //remaining adddition
  for(let i=0; i<PasswordLength-funcArr.length; i++) {
      let randIndex = getRndInteger(0 , funcArr.length);
      console.log("randIndex" + randIndex);
      Password += funcArr[randIndex]();
  }
  console.log("Remaining adddition done");
  //shuffle the password
  password = shufflePassword(Array.from(Password));
  console.log("Shuffling done");
  //show in UI
  displayPass.value = Password;
  console.log("UI adddition done");
  //calculate strength
  calcStrength();
});