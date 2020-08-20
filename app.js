// Book constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

UI.prototype.addBookToList= function(book){
    const list=document.getElementById('book-list');
    //create tr element
    const row=document.createElement('tr');

    row.innerHTML= `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
}

// clear fields
UI.prototype.clearFields=function(){
    document.getElementById('title').value=""
    document.getElementById('author').value=""
    document.getElementById('isbn').value=""
}

// event listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
    // get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book= new Book(title, author,isbn);

  const ui= new UI()

  ui.addBookToList(book)

  ui.clearFields()
  
  e.preventDefault();
});
