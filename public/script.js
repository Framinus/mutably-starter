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
        // everything above this point works
        booklist.books.map((book) => {
          $('.list-group').append(`<li><img src="${book.image}"> "title: ${book.title} author: ${book.author} release date: ${book.releaseDate} </li>`);
        });
      })
      .catch(console.error);
  };

$('.create-button').on('click', createBook);
$('.booklist').on('click', listBooks);








});
