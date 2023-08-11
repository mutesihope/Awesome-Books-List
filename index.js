class BookManager {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.addButton = document.querySelector('.button-submit');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.bookList = document.querySelector('.Booklist ul');

    this.addButton.addEventListener('click', this.addBook.bind(this));
    window.addEventListener('load', this.loadBooks.bind(this));
  }

  removeBook(event) {
    const bookDiv = event.target.parentNode;
    const hrLine = bookDiv.nextElementSibling;
    bookDiv.remove();
    if (hrLine) {
      hrLine.remove();
    }
    this.updateLocalStorage();
  }

  addBook(event) {
    event.preventDefault();

    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();

    if (title === '' || author === '') {
      console.log('Please enter both title and author name.');
      return;
    }

    const newBookItem = document.createElement('li');
    newBookItem.innerHTML = `${title}<span> by </span>${author}`;

    const removeButton = document.createElement('button');
    removeButton.className = 'button-remove';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', this.removeBook.bind(this));

    const bookDiv = document.createElement('div');
    bookDiv.className = 'Booklist';
    bookDiv.appendChild(newBookItem);
    bookDiv.appendChild(removeButton);

    const hrLine = document.createElement('hr');
    hrLine.className = 'hr-line';

    this.bookList.appendChild(bookDiv);
    this.bookList.appendChild(hrLine);

    this.updateLocalStorage();

    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  updateLocalStorage() {
    const bookList = this.bookList.querySelectorAll('li');
    const books = [];

    bookList.forEach((bookItem) => {
      const title = bookItem.innerText.split(' by ')[0];
      const author = bookItem.innerText.split(' by ')[1];
      books.push({ title, author });
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  loadBooks() {
    const books = JSON.parse(localStorage.getItem('books'));

    if (books) {
      this.bookList.innerHTML = '';

      books.forEach((book) => {
        const newBookItem = document.createElement('li');
        newBookItem.innerHTML = `${book.title}<span> by </span>${book.author}`;

        const removeButton = document.createElement('button');
        removeButton.className = 'button-remove';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', this.removeBook.bind(this));

        const bookDiv = document.createElement('div');
        bookDiv.className = 'Booklist';
        bookDiv.appendChild(newBookItem);
        bookDiv.appendChild(removeButton);

        const hrLine = document.createElement('hr');
        hrLine.className = 'hr-line';

        this.bookList.appendChild(bookDiv);
        this.bookList.appendChild(hrLine);
      });
    }
  }
}

const bookManager = new BookManager();
