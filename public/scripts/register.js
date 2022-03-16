const registerForm = document.forms.register;
const errorDiv = document.querySelector('.errors');

async function registerUser(registrationData) {
  const resp = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);

  if (respInJs.success === false) {
    errorDiv.innerHTML = '';
    respInJs.error.forEach((err) => {
      console.log(err.message);
      errorDiv.innerHTML += `<h5>${err.message}</h5>`;
    });
  }

  if (respInJs.success === true) {
    alert(respInJs.data);
    window.location.replace(`index.html?email=${registrationData.email}`);
  }
}

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const pass1 = event.target.elements.password.value;
  const pass2 = event.target.elements.password2.value;
  console.log(pass1, pass2);
  if (pass1 !== pass2) {
    errorDiv.innerHTML = 'Password dont match';
    return;
  }
  errorDiv.innerHTML = '';
  const registrationData = {
    full_name: event.target.elements.fullName.value,
    email: event.target.elements.email.value,
    password: pass2,
  };

  console.log(registrationData);
  registerUser(registrationData);
});
