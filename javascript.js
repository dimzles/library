//Storing elements in variables
const shelf = document.getElementById("shelf");
const createBtn = document.getElementById("createBtn");
const submitBtn = document.getElementById("submitBtn");
const popupContainer = document.getElementById("popup-container");
const formContainer = document.getElementById("form-container");
const bookForm = document.getElementById("book-form");
const removeBtn = document.getElementsByClassName("removeBtn");
const readBtn = document.getElementsByClassName("readBtn");

let myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
  info() {
    return `
        ${this.title}
        by
        ${this.author}
        ${this.pages}, ${this.readStatus ? "read" : "unread"}.`;
  }
  toggleReadStatus() {
    if (this.readStatus !== true) {
      this.readStatus = true;
      updateBookGrid();
    } else this.readStatus = false;
    updateBookGrid();
  }
}

function addBooksToShelf() {
  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);
    shelf.appendChild(card);

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    card.appendChild(cardText);
    cardText.textContent = `${myLibrary[i].info()}`;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
    card.appendChild(btnContainer);

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "Remove";
    btnContainer.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      updateBookGrid();
    });

    let readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    if (myLibrary[i].readStatus !== true) {
      readBtn.classList.add("unread");
      readBtn.textContent = `Unread`;
    } else {
      readBtn.classList.add("read");
      readBtn.textContent = `Read`;
    }
    btnContainer.appendChild(readBtn);
    readBtn.addEventListener("click", () => {
      myLibrary[i].toggleReadStatus();
    });
  }
}

function handleFormValues() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("readStatus").checked;
  console.log(`${title}, ${author}, ${pages}, ${readStatus}`);
  let newBook = new Book(title, author, pages, readStatus);
  return myLibrary.push(newBook);
}

function resetFormValues() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const readStatus = document.getElementById("readStatus");
  title.value = "";
  author.value = "";
  pages.value = "";
  readStatus.checked = false;
}

function removeActiveClass() {
  popupContainer.classList.remove("active");
  formContainer.classList.remove("active");
}

function updateBookGrid() {
  clearBookGrid();
  addBooksToShelf();
}
d;

function clearBookGrid() {
  shelf.innerHTML = "";
}

createBtn.addEventListener("click", () => {
  popupContainer.classList.add("active");
  formContainer.classList.add("active");
});

popupContainer.addEventListener("click", () => {
  removeActiveClass();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleFormValues();
  removeActiveClass();
  resetFormValues();
  updateBookGrid();
});
