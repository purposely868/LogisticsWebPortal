"user strict";

const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", (e) => {
  const formLogin = document.querySelector(".userLogin");

  console.log("event submit");
  fetch("/pasUserCheck", {
    method: "POST",
    body: new FormData(formLogin),
  })
    .then((resolve) => {
      return resolve.json();
    })
    .then((resolved) => {
      if (resolved.err == false) {
        formLogin.submit();
      } else {
        formLogin.parentNode.appendChild(
          document.createTextNode(resolved.message)
        );
      }
    });
});
