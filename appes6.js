class Book{
 constructor(title, author, isbn){
     this.title=title;
     this.author=author;
     this.isbn=isbn
 }
}

class UI {
    addBookToList(book){
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
    }
    showAlert(message, className){
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
    }
    deleteBook(target){
        if(target.className==="delete"){
            target.parentElement.parentElement.remove()
        }
    }
    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}

// local storage class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
             books=[]
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui= new UI;
            //add book to UI
            ui.addBookToList(book)
        })
    }

    static addBook(book){
        const books= Store.getBooks();
        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(){

    }
}

//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)


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
      ui.showAlert("Book Added!", "success")
      ui.addBookToList(book);
  
    Store.addBook(book);

      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  // event listener to delete
  document.getElementById('book-list').addEventListener('click', function(e){
      const ui = new UI();
      ui.deleteBook(e.target);
      //show alert
      ui.showAlert("Book Removed", 'success')
      e.preventDefault()
  })
  