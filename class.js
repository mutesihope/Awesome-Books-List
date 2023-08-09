class BookListManager {
  constructor() {
    this.bookList = [];
    this.loadBooks();
    this.addButton = document.querySelector('.button-submit');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');

    this.addButton.addEventListener('click', this.addBook.bind(this));
  }

  removeBook(event) {
    const bookDiv = event.target.parentNode;
    const hrLine = bookDiv.nextElementSibling;

    const title = bookDiv.querySelector('li').innerText.split(' by ')[0];

    const bookIndex = this.bookList.findIndex(book => book.title === title);

    if (bookIndex !== -1) {
      this.bookList.splice(bookIndex, 1);
      this.updateLocalStorage();
    }

    bookDiv.remove();
    if (hrLine) {
      hrLine.remove();
    }
  }

  addBook(event) {
    event.preventDefault();

    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();

    if (title === '' || author === '') {
      console.log('Please enter both title and author name.');
      return;
    }

    this.bookList.push({ title, author });
    this.renderBook({ title, author });
    this.updateLocalStorage();

    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  renderBook(book) {
    const bookList = document.querySelector('.Booklist ul');

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

    bookList.appendChild(bookDiv);
    bookList.appendChild(hrLine);
  }

window.addEventListener('load', () => {
  const bookListManager = new BookListManager();
});
