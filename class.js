class book {
  constructor(title, author){
  this.title = title;
  this.author = author;
  }
}

class BookManager{
  constructor(){
    this.book = [];
    this.initElement();
    this.attachEventListeners()
    this.loadBookFromStorage();
    this.displayBooks();
  }

  initElement(){
    this.bookData = document.getElementById('bookData');
    this.bookForm = document.getElementById('bookForm');
    this.booksLink = document.getElementById('bookslink');
    this.addBookLink = document.getElementById('addBookLink');
    this.contactLink = document.getElementById('contactLick');
  }

  attachEventListeners(){
    this.booksLink.addEventListener('click', () => this.showSection('bookSection'));
    this.addBookLink.addEventListener('click', () => this.showSection('addBookSection'));
    this.contactLink.addEventListener('click' () => this.showSection('contactSection'));
    this.bookForm.addEventListener('submit', event => this.handleFormSubmission(event));
  }

  loadBooksFromStorage(){
    const storedBooks = localStorage.getItem('books');
    this.books = storedBooks ? JSON.parse(storedBooks) : [];
  }

  saveBooksToStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    this.bookData.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookDiv = this.createBookDiv(book);
      this.bookData.appendChild(bookDiv);
    });
}

createBookDiv(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book-list');
  bookDiv.textContent = `${book.title} by ${book.author}`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Delete';
  removeBtn.addEventListener('click', () => this.removeBook(index));

  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(document.createElement('hr'));
  return bookDiv;
}



removeBook(index) {
  this.books.splice(index, 1);

  this.saveBooksToStorage();
  this.displayBooksToStorage();
}

showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === sectionId);
  });
}

init() {
  this.showSection('bookSection');
}

}

const BookManager = new BookManager();
bookManager.init();