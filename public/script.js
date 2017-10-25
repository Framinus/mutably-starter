console.log("Sanity Check: JS is working!");

$(document).ready(function () {

  $('.alert-success').hide();
  $('.alert-danger').hide();

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
                 <button type="submit" class="save-btn">Save</button>
                 <input class="save-title" data-id="${book._id}" data-title="${book.title}" data-author="${book.author}" data-image="${book.image}" data-date="${book.releaseDate}" type="text">
            </span>
            <span class="book-info"> author: ${book.author}
              release date: ${book.releaseDate}
            </span>

            <button type="button" class="delete-btn">Delete</button>
            </li>`);
        });
        $('.edit-save').hide();
        $('.title-edit').show();
        $('.delete-btn').show();
        $('.alert-success').hide();
        $('.alert-danger').hide();
      })
      .catch(console.error);
  };

  const editBook = (event) => {
    console.log('edit button is being clicked');
    $('.title-edit').hide();
    $('.delete-btn').hide();
    $('.edit-save').show();
  }

  const saveBook = (event) => {
    event.preventDefault();
    const id = $('.save-title').attr("data-id");
    console.log(id);
    const title = document.querySelector('.save-title').value;
    const author = $('.save-title').attr("data-author");
    console.log(author);
    const image = $('.save-title').attr("data-image");
    const date = $('.save-title').attr("data-date");
    fetch(`https://mutably.herokuapp.com/books/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, author, image, date }),
    })
      .then(response => response.json())
      .then(() => {
        $('li').remove();
        $('.alert-success').show();
      })
      .catch(console.error);
  }

  const deleteBook = (event) => {
    event.preventDefault();
    const id = $('.save-title').attr("data-id");
    fetch(`https://mutably.herokuapp.com/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(() => {
      $('li').remove()
      $('.alert-danger').show();
    })
    .catch(console.error);
  }

  $('.create-button').on('click', createBook);
  $('.booklist').on('click', listBooks);
  $(document).on('click', '.save-btn', saveBook);
  $(document).on('click', '.edit-btn', editBook);
  $(document).on('click', '.close-success', listBooks);
  $(document).on('click', '.delete-btn', deleteBook);
  $(document).on('click', '.fade-delete', listBooks);


});
