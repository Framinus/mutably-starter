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

$('.create-button').on('click', createBook);









});
