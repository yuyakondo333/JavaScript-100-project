const lengthSlider = document.querySelector('.pass-length input'); // パスワードの長さを設定するスライダー要素を取得
const options = document.querySelectorAll('.option input'); // パスワード生成オプション（大文字、小文字、数字、記号など）のチェックボックスを全て取得
const copyIcon = document.querySelector('.input-box span'); // パスワードをコピーするアイコン要素を取得
const passwordInput = document.querySelector('.input-box input'); // 生成されたパスワードを表示する入力フィールドを取得
const passIndicator = document.querySelector('.pass-indicator'); // パスワードの強度を表示するインジケーター要素を取得
const generateBtn = document.querySelector('.generate-btn'); // パスワード生成ボタン要素を取得

const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!$%&|[](){}:;.,*+-#@<>~',
};

const generatePassword = () => {
  let staticPassword = '',
    randomPassword = '',
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
        staticPassword += characters[option.id];
      } else if (option.id === 'spaces') {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == ' '
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    length.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'midium' : 'string';
};

const updateSlider = () => {
  document.querySelector('.pass-length span').innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = 'check';
  copyIcon.style.color = '#4285f4';
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
