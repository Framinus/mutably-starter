console.log("Sanity Check: JS is working!");
/* global $ */

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
      .catch(console.error);
  };

  const listBooks = function (event) {
    event.preventDefault();
    fetch('https://mutably.herokuapp.com/books', {
      method: 'GET',
    })
      .then(response => response.json())
      .then((booklist) => {
        booklist.books.map((book) => {
          $('.list-group').append(`
            <li>
            <img class="book-image" src="${book.image}">

            <span class="title-edit">
              <button type="button" class="edit-btn" data-id="${book._id}">Edit</button>
                <span class="title-text">title: ${book.title}</span>
            </span>

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

  const editBook = function () {
    $(this).parent().hide();
    $(this).parent().next().next().next().hide();
    $(this).parent().next().show();
  }

  const saveBook = function (event) {
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
      .then((response) => {
        $(this).parent().prev().find('.title-text').text(`title:${response.title}`);
        $('.alert-success').show();
      })
      .catch(console.error);
  }

  const deleteBook = function (event) {
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
        $(this).parent().remove();
        $('.alert-danger').show();
      })
      .catch(console.error);
  };

  const openModal = () => {
    $("div").removeClass('closed');
  };

  const closeModal = () => {
    $(".modal-window").addClass('closed');
    $(".modal-background").addClass('closed');
  };

  $('.modal-open').on('click', openModal);
  $('.close-modal-button').on('click', closeModal);
  $('.create-button').on('click', createBook);
  $('.booklist').on('click', listBooks);
  $(document).on('click', '.save-btn', saveBook);
  $(document).on('click', '.edit-btn', editBook);
  $(document).on('click', '.close-success', listBooks);
  $(document).on('click', '.delete-btn', deleteBook);
  $(document).on('click', '.fade-delete', listBooks);
});
