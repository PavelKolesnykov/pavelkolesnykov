const emailInput = document.querySelector("#email");
const urlInput = document.querySelector("#verificationURL");
const submitButton = document.querySelector("#submit");
const emailErorr = document.querySelector('#emailErorr');
const URLErorr = document.querySelector('#URLErorr');
const form = document.querySelector(".form");

emailInput.addEventListener('blur', validateEmail);
urlInput.addEventListener('blur', validateURL);

function validateEmail() {
  // Перевіряємо Email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput.value)) {
    emailInput.setCustomValidity("Email erorr");
    emailInput.classList.add('form__erorr');
    emailErorr.classList.remove('hidden');

  }
  else {
    emailInput.setCustomValidity("");
    emailInput.classList.remove('form__erorr');
    emailErorr.classList.add('hidden');
  }
  // // Вмикаємо кнопку відправки,якщо поля заповнені і активні
  submitButton.disabled = !isFormValid();
}
function validateURL() {
  // Перевіряємо чи починається URL зі строки "https://"
  if (!urlInput.value.startsWith("https://")) {
    urlInput.setCustomValidity("URL erorr");
    urlInput.classList.add('form__erorr');
    URLErorr.classList.remove('hidden');
  } else {
    urlInput.setCustomValidity("");
    urlInput.classList.remove('form__erorr');
    URLErorr.classList.add('hidden');
  }

  // // Вмикаємо кнопку відправки,якщо поля заповнені і активні
  submitButton.disabled = !isFormValid();
}

function isFormValid() {
  // Перевіряємо, чи заповнені поля і проходять валідацію
  return emailInput.checkValidity() && urlInput.checkValidity();
}



 // Відправляємо данні з полів форми 
 submitButton.addEventListener('click',sendMessage);

 function sendMessage(e){
  e.preventDefault();
  let address = urlInput.value;
  const formData = new FormData(form);
 
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
    // Запит виконаний успішно
    console.log("POST-запит виконаний успішно");
    console.log(this.responseText);
  } else if (this.readyState === 4) {
    // Помилка запиту
    console.error("Помилка виконання POST запиту");
  }
};

xhttp.open("POST", address, true);
// xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(formData);


 // робимо редірект на https://payproglobal.com
 document.location.href = 'https://payproglobal.com';
}

 