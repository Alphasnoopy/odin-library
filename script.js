let myLibrary = [];
const addBookBtn = document.querySelector('.addBook');
const popUp = document.querySelector('.popUp');
const bookForm = document.querySelector('.bookForm');
const bookArea = document.querySelector('.bookArea');
const overlay = document.querySelector('.overlay');

function popUpForm() {
    popUp.classList.add('active');
    overlay.style.display = "block";
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
    overlay.style.display = "none";
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

function readColor(readBtn, ifRead) {
    (ifRead)? readBtn.classList.remove('readFalse') : readBtn.classList.add('readFalse');
}

function toggleRead(card) {
    const toggleTitle = card.querySelector('.cardTitle').textContent.slice(1, -1);
    const toggleAuthor = card.querySelector('.cardAuthor').textContent.substring(2);
    for (let book of myLibrary) {
        if (book.title === toggleTitle && book.author === toggleAuthor) {
            (book.isRead)? book.isRead = false : book.isRead = true;
        }
    }

    addBookToLibrary();
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
        title.classList.add('cardTitle');
        author.classList.add('cardAuthor');
        readBtn.classList.add('cardReadBtn');

        title.textContent = `"${book.title}"`;
        author.textContent = `- ${book.author}`;
        pages.textContent = `${book.pages} Pages`;
        readBtn.textContent = 'Read';

        readColor(readBtn, book.isRead);

        bookCard.append(title, author, pages, readBtn);
        bookArea.append(bookCard);
        readBtn.addEventListener("click", function() {
            toggleRead(readBtn.parentElement);
        });
    }
}

addBookBtn.addEventListener("click", popUpForm);
bookForm.addEventListener("submit", addBook);
overlay.addEventListener("click", resetForm);