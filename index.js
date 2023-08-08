/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
function removeBook(event) {
  const bookDiv = event.target.parentNode;
  const hrLine = bookDiv.nextElementSibling; // Get the <hr> element after the book div
  bookDiv.remove();
  if (hrLine) {
    hrLine.remove(); // Remove the <hr> line if it exists
  }

  // Update local storage after removing the book
  updateLocalStorage();
}
// Function to add a book to the list and update local storage
function addBook(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const title = titleInput.value;
  const author = authorInput.value;
  // avoids default or empty submition
  if (title.trim() === '' || author.trim() === '') {
  alert('Please enter both title and author name.');
  return;
  }

  const bookList = document.querySelector('.Booklist ul');
  const newBookItem = document.createElement('li');
  newBookItem.innerHTML = `${title}<span> by </span>${author}`;

  const removeButton = document.createElement('button');
  removeButton.className = 'button-remove';
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', removeBook);

  // adds a new book and remove button
  const bookDiv = document.createElement('div');
  bookDiv.className = 'Booklist';
  bookDiv.appendChild(newBookItem);
  bookDiv.appendChild(removeButton);

  const hrLine = document.createElement('hr');
  hrLine.className = 'hr-line';

  bookList.appendChild(bookDiv);
  bookList.appendChild(hrLine);

  // Clear input fields after adding the book
  titleInput.value = '';
  authorInput.value = '';
  // Update local storage after adding the book
  updateLocalStorage();
}

// Function to update local storage with the current book list
function updateLocalStorage() {
  const bookList = document.querySelectorAll('.Booklist ul li');
  const books = [];

  bookList.forEach((bookItem) => {
    const title = bookItem.innerText.split(' by ')[0];
    const author = bookItem.innerText.split(' by ')[1];
    books.push({ title, author });
  });

  localStorage.setItem('books', JSON.stringify(books));
}

// Function to load books from local storage
function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books'));

  if (books) {
    const bookList = document.querySelector('.Booklist ul');
    bookList.innerHTML = '';

    books.forEach((book) => {
      const newBookItem = document.createElement('li');
      newBookItem.innerHTML = `${book.title}<span> by </span>${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.className = 'button-remove';
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', removeBook);

      const bookDiv = document.createElement('div');
      bookDiv.className = 'Booklist';
      bookDiv.appendChild(newBookItem);
      bookDiv.appendChild(removeButton);

      const hrLine = document.createElement('hr');
      hrLine.className = 'hr-line';

      bookList.appendChild(bookDiv);
      bookList.appendChild(hrLine);
    });
  }
}

// Add event listener to the Add button
const addButton = document.querySelector('.button-submit');
addButton.addEventListener('click', addBook);

// Load books from local storage on new page load
window.addEventListener('load', loadBooks);
