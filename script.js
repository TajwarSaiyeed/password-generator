const lengthSlider = document.querySelector(".pass-length input"),
  generateBtn = document.querySelector(".generate-btn"),
  options = document.querySelectorAll(".option input"),
  passwordInput = document.querySelector(".input-box input"),
  passwordIndicator = document.querySelector(".pass-indicator"),
  copyIcon = document.querySelector(".input-box span");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    passLength = lengthSlider.value,
    excludeDuplicate = false;
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword = `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passwordIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length .details span").innerText =
    lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.innerText = "copy_All";
  }, 1500);
};

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
