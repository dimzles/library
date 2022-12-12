//Storing DOM Elements in variables
const shelf = document.getElementById('shelf');
const createBtn = document.getElementById('createBtn');
const submitBtn = document.getElementById('submitBtn');
const popupContainer = document.getElementById('popup-container');
const formContainer = document.getElementById('form-container');
const bookForm = document.getElementById('book-form');

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295 pages', false);
const harryPotter = new Book('Harry Potter and the Philosphers Stone', 'J. K. Rowling', '223 pages', true);
const howToWinFriends = new Book('How to Win Friends and Influence People', 'Dale Carnegie', '275 pages', false);
const crushingIt = new Book('Crushing It!', 'Gary Vaynerchuk', '288 pages', false);

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
    ${this.author}
    ${this.pages}, ${this.readStatus ? "read" : "unread"}.`
}

function addBookToLibrary(...books) {
    return myLibrary.push(...books);
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
    const readStatus = document.getElementById('readStatus').value;
    console.log(`${title}, ${author}, ${pages}, ${readStatus}`);
    let newBook = new Book(title, author, pages, readStatus);
    return myLibrary.push(newBook);
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
});

addBookToLibrary(theHobbit, harryPotter, howToWinFriends, crushingIt);
addBooksToShelf();