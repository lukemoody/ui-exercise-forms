import axios from "axios";

console.log("Hello world");

// Process form submission
const processForm = (e) => {
  e.preventDefault();

  const form = e.target;

  console.log("Submited");

  const formData = new FormData(form);

  // View data submitted by the form
  for (var value of formData.values()) {
    console.log(value);
  }

  // formData.append("action", "processForm");

  axios({
    method: "POST",
    // url: "/customer/account/resetPassword",
    url: "https://jsonplaceholder.typicode.com/posts", // using to test POST request actually sends
    data: formData,
  }).then(
    function (res) {
      console.log(res.status);
      console.log(res.data);
    },
    (error) => {
      console.log(error);
    }
  );
};

// Init form submit
const forms = document.querySelectorAll("[data-process]");
if (!forms) false;

forms.forEach((form) => {
  form.addEventListener("submit", processForm);
});

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
