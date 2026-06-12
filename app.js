const submit = document.getElementById("mySubmit");
const comment = document.getElementById("comments");
const email = document.getElementById("email");
submit.disabled = true;
email.style.display = "none"
const firstname = document.querySelector('#name');
const lastname = document.querySelector('#last-name');
function checkInput(){
    localStorage.setItem("firstName", firstname.value);
    localStorage.setItem("lastName", lastname.value);
    if(firstname.value.length > 0 && lastname.value.length > 0){
        submit.disabled = false;
    }else{
        submit.disabled = true;
    }
}
firstname.addEventListener("input",checkInput);
lastname.addEventListener("input",checkInput);

const checkbox = document.getElementById("newsletter");
checkbox.addEventListener("change", function() {
    if(checkbox.checked){
         email.style.display = "block"
    }else{
        email.style.display = "none"
    }
});
const message = document.getElementById("message");
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();// stops the page from reloading on submit
  const data = {
    firstName: firstname.value,
    lastName: lastname.value,
    comment: comment.value,
    isSubscribed: checkbox.checked,
    email: checkbox.checked ? email.value : undefined
  };
  fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
}).then(response => response.json()).then(data => {
  console.log('Success:', data);
  message.textContent = 'Thanks for your submission, ' + firstname.value + '!';
  firstname.value = "";
    lastname.value = "";
    comment.value = "";
    email.value = "";
    checkbox.checked = false;
    email.style.display = "none";
    submit.disabled = true;
    setTimeout(function() {
    message.textContent = "";
}, 2000);
}).catch((error) => {
  console.error('Error:', error);
  message.textContent = 'Oops something went wrong';
});
});

