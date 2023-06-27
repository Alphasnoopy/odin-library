let myLibrary = [];
const addBookBtn = document.querySelector('.addBook');
const popUp = document.querySelector('.popUp');
const bookForm = document.querySelector('.bookForm');
const bookArea = document.querySelector('.bookArea');
const overlay = document.querySelector('overlay');

function popUpForm() {
    console.log('click');
    popUp.classList.add('active');
}

class Book {
    constructor (title = 'unknown', author = 'unknown', pages = '0', isRead = false) {
        this.title = document.getElementById('title').value;
        this.author = document.getElementById('author').value;
        this.pages = document.getElementById('pages').value;
        this.isRead = document.getElementById('isRead').checked;
    }
}

function resetForm() {
    popUp.classList.remove('active');
    bookForm.reset();
}

function addBook(e) {
    e.preventDefault();
    const newBook = new Book();
    myLibrary.push(newBook);
    resetForm();
    addBookToLibrary();
}

function resetBooks() {
    bookArea.innerHTML = '';
    bookArea.appendChild(addBookBtn);
}

function addBookToLibrary() {
    resetBooks();

    for (let book of myLibrary) {
        const bookCard = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const readBtn = document.createElement('button');

        bookCard.classList.add('card');
        author.classList.add('authorCard');

        title.textContent = `"${book.title}"`;
        author.textContent = `- ${book.author}`;
        pages.textContent = `${book.pages} Pages`;
        readBtn.textContent = 'Read';

        bookCard.append(title, author, pages, readBtn);
        bookArea.append(bookCard);
    }
}

addBookBtn.addEventListener("click", popUpForm);
bookForm.addEventListener("submit", addBook);
overlay.addEventListener("click", resetForm);