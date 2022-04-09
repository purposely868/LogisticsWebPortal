"usestrict";

const createDb = document.querySelector("#createDbBtn");
const createIn = document.querySelector("#createDbIn");
const deleteDb = document.querySelector("#deleteDbBtn");
const deleteIn = document.querySelector("#deleteDbIn");

const par = document.createElement("p");

createDb.addEventListener("click", () => {
  fetch(`/database/create?name=${createIn.value}`)
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      par.innerText = `Database ${createIn.value}'s creation went ${res}.`;
      document.getElementById("main").appendChild(par);
    });
});

deleteDb.addEventListener("click", () => {
  fetch(`/database/delete?name=${createIn.value}`)
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      par.innerText = `Database ${createIn.value}'s deletion went ${res}.`;
      document.getElementById("main").appendChild(par);
    });
  console.log(deleteIn.value);
});
