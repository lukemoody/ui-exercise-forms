import axios from "axios";
import Bouncer from "formbouncerjs";

console.log("Hello world");

// Process form submission
const processForm = (e) => {
  e.preventDefault();

  const form = e.target;
  // console.log("Submited");

  const email = (<HTMLInputElement>document.getElementById("email-address"))
    .value; // TypeScript version

  return axios({
    method: "POST",
    url: "http://localhost:3005/customer/account/resetPassword",
    // url: "https://jsonplaceholder.typicode.com/posts", // using to test POST request actually sends
    // data: formData,
    data: {
      email: email, // 'email-address'
    },
  }).then(
    function (res) {
      console.log(res.status);
      console.log(res.data);

      // If email exists show success message
      if (email) {
        console.log("Email exists");
        let msg = <HTMLElement>document.querySelector("[data-msg]");
        // const msg = document.querySelector('[data-msg]');
        msg.innerHTML = `
            <p><strong>Success, we have emailed your password reset link</strong></p>
            <p>Nunc vel elit leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
          `;
        msg.querySelector("strong").style.color = "#3e71a8";

        // Get users hint
        axios
          .get("http://localhost:3005/users")
          .then(function (res) {
            let resData = res.data;
            console.log(resData);

            // TODO: need to get the ID of the user based on email to get the correct hint value to display

            // resData.forEach(e => {
            //   console.log(e.id, e.name, e.email, e.hint);
            // })
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Email doesnt exist");
      }
    },
    (error) => {
      console.log(error);
      let msg = <HTMLElement>document.querySelector("[data-msg]");
      msg.innerHTML =
        "<p><strong>Sorry, theres no account attached to that email.</strong></p>";
      msg.querySelector("strong").style.color = "#ff0000";
    }
  );
};

// Init form submit
const forms = document.querySelectorAll("[data-process]");
if (!forms) false;

forms.forEach((form) => {
  form.addEventListener("submit", processForm);
});

var bouncer = Bouncer("[data-validate]", {
  disableSubmit: true,
});

// document.addEventListener('bouncerFormInvalid', function (event) {
// console.log(event.detail.errors);
// console.log(event.detail.errors[0].offsetTop);
// window.scrollTo(0, event.detail.errors[0].offsetTop);
// }, false);

document.addEventListener(
  "bouncerFormValid",
  function () {
    // alert('Form submitted successfully!');
    // Reload page to remove success message
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  },
  false
);

// Accordion
const acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
