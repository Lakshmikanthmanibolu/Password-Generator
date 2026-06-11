const passwordBox = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const toast = document.getElementById("toast");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword(){

    const length = parseInt(lengthSlider.value);

    const uppercase =
        document.getElementById("uppercase").checked;

    const lowercase =
        document.getElementById("lowercase").checked;

    const numbers =
        document.getElementById("numbers").checked;

    const symbols =
        document.getElementById("symbols").checked;

    let chars = "";

    if(uppercase)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(lowercase)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if(numbers)
        chars += "0123456789";

    if(symbols)
        chars += "!@#$%^&*()_+[]{}<>?/";

    if(chars === ""){
        alert("Select at least one option");
        return;
    }

    let password = "";

    for(let i=0;i<length;i++){
        password += chars.charAt(
            Math.floor(Math.random()*chars.length)
        );
    }

    passwordBox.value = password;

    checkStrength(password);
}

function checkStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;

    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[!@#$%^&*]/.test(password)) score++;

    if(score <= 2){

        strengthText.textContent = "Weak";
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";

    }
    else if(score <= 4){

        strengthText.textContent = "Medium";
        strengthFill.style.width = "65%";
        strengthFill.style.background = "#f59e0b";

    }
    else{

        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";

    }
}

copyBtn.addEventListener("click", () => {

    if(passwordBox.value === "") return;

    navigator.clipboard.writeText(
        passwordBox.value
    );

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

});
