//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author =  author;
    this.isbn = isbn;
}


//UI constructor
function UI(){}
    //add book to list
    UI.prototype.addBookList =  function(book){

        const list = document.getElementById('book-list');

        //create tr
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    //show alert
    UI.prototype.showAlert = function(message, className){
        //cretaet div
        const div = document.createElement('div');
        //add classes
        div.className = `alert ${className}`;
        //add text
        div.appendChild(document.createTextNode(message));

        //get parent
        const container =  document.querySelector('.container');
        const form = document.querySelector('#book-form');

        //insert alert
        container.insertBefore(div, form);

        //time out after 3 sec

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    //delete book
    UI.prototype.deleteBook = function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
//clear fields

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//event listeners
document.getElementById('book-form').addEventListener('submit', function(e){

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn =  document.getElementById('isbn').value

    //instantiate the book
    const book = new Book(title,author,isbn);
    

    //instantiate the UI
    const ui = new UI();

    //validate 
    if(title === '' || author === '' || isbn === ''){
        //show alert
        ui.showAlert('Please fill all the fields.', 'error');
    } else{
          //add book to list
    ui.addBookList(book);
    //clear field
        ui.clearFields();
    }
  

    e.preventDefault();
});

//event listener for delete

document.getElementById('book-list').addEventListener('click', function(e){

     //instantiate the UI
     const ui = new UI();

     ui.deleteBook(e.target);
     //show alert
     ui.showAlert('Book removed!', 'sucess');

    e.preventDefault();
});