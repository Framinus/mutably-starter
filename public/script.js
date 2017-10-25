console.log("Sanity Check: JS is working!");

$(document).ready(function () {

  const createBook = (event) => {
    event.preventDefault();
    const title = document.querySelector('.modal-title').value;
    const author = document.querySelector('.modal-author').value;
    const imageUrl = document.querySelector('.modal-image-url').value;
    const releaseDate = document.querySelector('.modal-release-date').value;
    fetch('https://mutably.herokuapp.com/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, author, imageUrl, releaseDate }),
    })
      .then(response => response.json())
      .then((newbook) => {
        console.log(newbook);
      })
      .catch(console.error);
  };

  const listBooks = (event) => {
    event.preventDefault();
    fetch('https://mutably.herokuapp.com/books', {
      method: 'GET',
      // headers: {
      //   'Accept': 'application/json, text/plain',
      //   'Content-type': 'application/json',
      // },
    })
      .then(response => response.json())
      .then((booklist) => {
        console.log(booklist.books);
        booklist.books.map((book) => {
          $('.list-group').append(`
            <li>
            <img class="book-image" src="${book.image}">
            <span class="title-edit">
              <button type="button" class="edit-btn">Edit</button>
               title: ${book.title}</span>
               <span class="edit-save">
                 <button type="button" class="save-btn">Save</button>
                 <input class="save-title" type="text" placeholder="${book.title}">
            <span class="book-info"> author: ${book.author}
              release date: ${book.releaseDate}
            </span>
            <button type="button" class="delete-btn">Delete</button>
            </li>`);
        });
      })
      .catch(console.error);
  };

  const editBook = (event) => {
    console.log('this button is being clicked');
    $('.title-edit').hide()
    $('.edit-save').show()
  }



  // const saveBook = (event) => {
  //   event.preventDefault();
  //   const title = document.querySelector('.save-title').value
  //   fetch('https://mutably.herokuapp.com/books/:id', {
  //     method: 'Put',
  //     headers: {
  //       'Accept': 'application/json, text/plain',
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify({title})
  //   })
  //   .then(response => response.json())
  //   .then((response) => {
  //     console.log(response);
  //   })
  // }

$('.create-button').on('click', createBook);
$('.booklist').on('click', listBooks);
// $('.save-btn').on('click', saveBook )
$(document).on('click', '.edit-btn', editBook)






});
