const shelf = document.getElementById('shelf');
const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295 pages', false);

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.readStatus ? "read" : "unread"}.`
}

console.log(theHobbit.info());