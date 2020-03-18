//class Book: Represents a book
class Book{
	constructor(title, author, ISBN){
		this.title = title; 
		this.author = author; 
		this.ISBN = ISBN; 
	}

}

//UI CLASS: HANDLES UI EVENTS
class UI{
	static displayBooks(){
		const books = Store.getBooks(); 
		books.forEach(function(book){
			UI.addBookToList(book);
		}); 
	}

	static addBookToList(book){
		const list = document.querySelector('.book-list');
		const row = document.createElement('tr'); 

		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.ISBN}</td>
			<td><a book-isbn='${book.ISBN}' class="delete" id="delete-book" href="#">X</a></td>
		`; 
		list.appendChild(row); 
	}
	//Delete book 
	static deleteBook(el){
		if(el.classList.contains('delete')){		
			el.parentElement.parentElement.remove();
	
		}

	}
	//Show alert div
	static showAlert(message, className){
		const div = document.createElement('div');
		div.className = `alert alert-${className}`; 
		div.textContent = message; 
		const bookInfo = document.querySelector('.container .bookInfo'); 
		const form = document.querySelector('form'); 
		bookInfo.insertBefore(div, form);

		//Set display alert timer 
		setTimeout(() => document.querySelector('.alert').remove(), 1500); 
	}
	//Clear Fields
	static clearFields(){	
		document.querySelector('.title').value = "";
		document.querySelector('.author').value = "";
		document.querySelector('.ISBN').value = "";
	}
} 


//Store books 
class Store{
	static getBooks(){
		let books; 
		if(localStorage.getItem('books') === null){
			let books = [];
			return books; 
		}else{
			 books = JSON.parse(localStorage.getItem('books'));
			 return books;
		}
	};

	static addBook(book){
		const books = Store.getBooks();
		books.push(book); 
		localStorage.setItem('books', JSON.stringify(books));	
	};

	static removeBook(ISBN){
		const books = Store.getBooks(); 
		books.forEach(function(book, index){
			if(book.ISBN === ISBN){
				book.splice(index, 1);
				console.log(ISBN); 
			}
		}); 
		localStorage.setItem('books', JSON.stringify(books));
	}
}
//Event: Display Books
document.querySelector('DOMContentLoaded', UI.displayBooks());
let book = document.querySelectorAll('#delete-book');
book.forEach(function(book){
	isbn = book.getAttribute('book-isbn');
	book.addEventListener('click', (e)=>{
		let newBooks = Store.getBooks().filter(b=> b.ISBN != isbn);
		localStorage.setItem('books', JSON.stringify(newBooks));
		book.parentElement.parentElement.remove();
  
	})
});
document.querySelector('.book-form').addEventListener('submit', (e)=>{
	e.preventDefault();
	let title = document.querySelector('.title').value; 
	let author = document.querySelector('.author').value;
	let ISBN = document.querySelector('.ISBN').value;
	
	if(title ==='' || author ==='' ||ISBN === ''){
		let message = 'Please make sure you feel all fields';
		UI.showAlert(message, 'danger'); 
	}else{
		const book = new Book(title, author, ISBN);
		//Add Book to UI
		UI.addBookToList(book);

		//Add book to local Storage
		Store.addBook(book);  

		// show successful alert
		UI.showAlert('SUCCESSFUL', 'success'); 
		
		//Clear all fields
		UI.clearFields();
	}	
});
	


//Remove Book 
document.querySelector('.book-list').addEventListener('click', (e)=>{
	UI.deleteBook(e.target);
	UI.showAlert('Book Deleted', 'success');	

}); 

