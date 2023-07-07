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

function findBook(card) {
    const title = card.querySelector('.cardTitle').textContent.slice(1, -1);
    const author = card.querySelector('.cardAuthor').textContent.substring(2);

    for (let book of myLibrary) {
        if (book.title === title && book.author === author) {
            return book;
        }
    }
}

function toggleRead(card) {
    const book = findBook(card);

    (book.isRead)? book.isRead = false : book.isRead = true;

    addBookToLibrary();
}

function removeCard(card) {
    const book = findBook(card);
    const index = myLibrary.indexOf(book);

    myLibrary.splice(index, 1);

    addBookToLibrary();
}

function addBookToLibrary() {
    resetBooks();

    for (let book of myLibrary) {
        const bookCard = document.createElement('div');
        const remove = document.createElement('button');
        const info = document.createElement('div')
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const readBtn = document.createElement('button');

        bookCard.classList.add('card');
        remove.classList.add('cardRemove');
        info.classList.add('cardInfo');
        title.classList.add('cardTitle');
        author.classList.add('cardAuthor');
        readBtn.classList.add('cardReadBtn');

        remove.textContent = '\u2715';
        title.textContent = `"${book.title}"`;
        author.textContent = `- ${book.author}`;
        pages.textContent = `${book.pages} Pages`;
        readBtn.textContent = 'Read';

        readColor(readBtn, book.isRead);

        info.append(title, author, pages, readBtn)
        bookCard.append(remove, info);
        bookArea.append(bookCard);

        remove.addEventListener("click", function() {
            removeCard(remove.parentElement)
        })

        readBtn.addEventListener("click", function() {
            toggleRead(readBtn.parentElement.parentElement);
        });
    }
}

addBookBtn.addEventListener("click", popUpForm);
bookForm.addEventListener("submit", addBook);
overlay.addEventListener("click", resetForm);