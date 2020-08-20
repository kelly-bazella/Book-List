// Book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
  list.appendChild(row);
};

// show alert
UI.prototype.showAlert = function (message, className) {
  // create div
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  //get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  //insert alert
  container.insertBefore(div, form);

  //time out after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove()
  }, 3000);
};

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // validate
  if (title === "" || author === "" || isbn === "") {
    //error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.showAlert("Success!", "success")
    ui.addBookToList(book);

    ui.clearFields();
  }

  e.preventDefault();
});
