//Storing DOM Elements in variables
const shelf = document.getElementById('shelf');
const createBtn = document.getElementById('createBtn');
const submitBtn = document.getElementById('submitBtn');
const popupContainer = document.getElementById('popup-container');
const formContainer = document.getElementById('form-container');
const bookForm = document.getElementById('book-form');

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function () {
    return `
    ${this.title}
    by
    ${this.author}
    ${this.pages} pages, ${this.readStatus ? "read" : "unread"}.`;
}

function addBooksToShelf() {
    for(let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        shelf.appendChild(card);
        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        card.appendChild(cardText);
        cardText.textContent = `${myLibrary[i].info()}`;
    }
}

function handleFormValues() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('readStatus').checked;
    console.log(`${title}, ${author}, ${pages}, ${readStatus}`);
    let newBook = new Book(title, author, pages, readStatus);
    return myLibrary.push(newBook);
}

function resetFormValues() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const readStatus = document.getElementById('readStatus');
    title.value = '';
    author.value = '';
    pages.value = '';
    readStatus.checked = false;
}

function removeActiveClass() {
    popupContainer.classList.remove('active');
    formContainer.classList.remove('active');
}

function updateBookGrid() {
    removeBookGrid();
    addBooksToShelf();
}

function removeBookGrid() {
    shelf.innerHTML = '';
}

createBtn.addEventListener('click', () => {
    popupContainer.classList.add('active');
    formContainer.classList.add('active');
});

popupContainer.addEventListener('click', () => {
    removeActiveClass();
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleFormValues();
    updateBookGrid();
    removeActiveClass();
    resetFormValues();
});