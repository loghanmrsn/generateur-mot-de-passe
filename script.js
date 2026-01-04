// Récupération des éléments
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const clipboardBtn = document.getElementById("clipboard");
const strengthEl = document.getElementById("strength");

// Fonctions caractères aléatoires
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+{}[]=<>/,.-";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Génération du mot de passe
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;

    const typesArr = [
        { lower },
        { upper },
        { number },
        { symbol }
    ].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return "";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

// Analyse de la force du mot de passe
function checkStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    strengthEl.className = "strength";

    if (score <= 3) {
        strengthEl.textContent = "Force : Faible";
        strengthEl.classList.add("weak");
    } else if (score <= 5) {
        strengthEl.textContent = "Force : Moyenne";
        strengthEl.classList.add("medium");
    } else {
        strengthEl.textContent = "Force : Forte";
        strengthEl.classList.add("strong");
    }
}

// Bouton Générer
generateBtn.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const password = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );

    if (!password) {
        resultEl.textContent = "⚠️ Sélectionnez une option";
        strengthEl.textContent = "Force : —";
        strengthEl.className = "strength";
        return;
    }

    resultEl.textContent = password;
    checkStrength(password);
});

// Bouton Copier
clipboardBtn.addEventListener("click", () => {
    const password = resultEl.textContent;

    if (!password || password.includes("⚠️")) return;

    navigator.clipboard.writeText(password).then(() => {
        const oldText = password;
        resultEl.textContent = "✔ Copié !";
        setTimeout(() => {
            resultEl.textContent = oldText;
        }, 1000);
    });
});
