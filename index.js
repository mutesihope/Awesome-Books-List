
const books = [];
function addBook(title, author) {
  const book = {
    title,
    author,
  };
  books.push(book);

  // Save the books in localStorage
localStorage.setItem('books', JSON.stringify(books));

  // Display the new book in the page
  const bookList = document.querySelector(".Booklist");
  const li = document.createElement("li");
  li.textContent = `${book.title}<span> by </span>${book.author}`;
  bookList.appendChild(li);
}


 // Function to remove a book from the collection
function removeBook(index) {
  books = books.filter((book, i) => i !== index);

  // Save the books in localStorage
  localStorage.setItem("books", JSON.stringify(books));

  // Remove the book from the page
  const bookList = document.querySelector(".Booklist");
  const li = bookList.children[index];
  li.remove();
}

// Load the books from localStorage
if (localStorage.getItem("books")) {
  books = JSON.parse(localStorage.getItem("books")) || [];
}

// Add event listeners to the buttons
const addButton = document.querySelector(".button-submit");
addButton.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  addBook(title, author);
});

const removeButton = document.querySelector(".button-remove");
removeButton.addEventListener("click", () => {
  const bookList = document.querySelector(".Booklist");
  const li = bookList.children[bookList.children.length - 1];
  const index = bookList.children.indexOf(li);
  removeBook(index);
});
