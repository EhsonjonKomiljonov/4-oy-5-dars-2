const elForm = document.querySelector(".js-form");
const elUserName = document.querySelector(".js-name");
const elRelationship = document.querySelector(".js-relationship");
const elPhoneNumber = document.querySelector(".js-phone-number");
const elSumbitter = document.querySelector(".js-submit");
const elContactBox = document.querySelector(".js-contact-box");

const localData = JSON.parse(window.localStorage.getItem("userinfo"));
const userInfo = localData || [];

const addNewContact = (array, node) => {
  window.localStorage.setItem("userinfo", JSON.stringify(userInfo));
  node.textContent = "";
  array.forEach((el) => {
    const newUserName = document.createElement("h2");
    const newRelation = document.createElement("h3");
    const newPhone = document.createElement("p");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");

    newUserName.setAttribute("class", "js-user-name");
    newRelation.setAttribute("class", "js-user-relation");
    newPhone.setAttribute(
      "class",
      "text-success rounded border border-success p-2 d-inline-block me-auto m-0"
    );
    newEditBtn.setAttribute("class", "js-edit-btn btn btn-warning ms-5 me-3");
    newDeleteBtn.setAttribute("class", "js-delete-btn btn btn-danger");

    newEditBtn.dataset.contacId = el.id;
    newDeleteBtn.dataset.contacId = el.id;

    newUserName.textContent = el.name;
    newRelation.textContent = el.relation;
    newPhone.textContent = el.phone;
    newEditBtn.textContent = "EDIT";
    newDeleteBtn.textContent = "DELETE";

    elContactBox.appendChild(newUserName);
    elContactBox.appendChild(newRelation);
    elContactBox.appendChild(newPhone);
    elContactBox.appendChild(newEditBtn);
    elContactBox.appendChild(newDeleteBtn);

    elUserName.value = "";
    elRelationship.value = "";
    elPhoneNumber.value = "";
  });
};

addNewContact(userInfo, elContactBox);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const findedIndex = userInfo.findIndex(
    (item) => item.phone === elPhoneNumber.value
  );

  if (findedIndex >= 0) {
    alert("Bunaqa raqamli User mavjud");
  } else {
    const userContact = {
      id: userInfo.length + 1,
      name: elUserName.value,
      relation: elRelationship.value,
      phone: elPhoneNumber.value,
    };

    userInfo.push(userContact);
    addNewContact(userInfo, elContactBox);
  }
});

elContactBox.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-delete-btn")) {
    let contactId = evt.target.dataset.contacId;

    let findedContact = userInfo.findIndex((el) => el.id == contactId);

    userInfo.splice(findedContact, 1);
    addNewContact(userInfo, elContactBox);
  }

  if (evt.target.matches(".js-edit-btn")) {
    let contactId = evt.target.dataset.contacId;

    let findedContact = userInfo.find((el) => el.id == contactId);
    let editName = prompt(
      "Ismga o'zgartirishni kiriting !!!",
      findedContact.name
    );
    let editRelation = prompt(
      "Kim ekanligiga O'zgartirishni kiriting !!!",
      findedContact.relation
    );
    let editPhone = prompt(
      "Telefon raqamga o'zgartirishni kiriting !!!",
      findedContact.phone
    );

    findedContact.name = editName;
    findedContact.relation = editRelation;
    findedContact.phone = editPhone;

    addNewContact(userInfo, elContactBox);
  }
});

// DARK MODE // LIGHT MODE

const elModeBtn = document.querySelector(".mode-btn");
let theme = false;

elModeBtn.addEventListener("click", () => {
  theme = !theme;
  const newBg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", newBg);
  newTheme();
});

let newTheme = () => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

newTheme();
