var fetch = function (isbnValue) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+ isbnValue,
    success: function(data) {
      
      console.log(data);
      var volumeInfo = data.items[0].volumeInfo;
      // Callback function
      appendNewBook(volumeInfo);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  }); 
};

var appendNewBook = function(volumeInfo) {
  // turn our "template" into html
  var source = $('#store-template').html();

  // compile our template html using handlebars
  var template = Handlebars.compile(source);

  // get the title
  var title = volumeInfo.title;
  // get the description
  var description = volumeInfo.description;
  // get the author
  var author = volumeInfo.authors;
  // get the image link
  var imageLink = volumeInfo.imageLinks.thumbnail;
  //var imageLink = 'http://books.google.com/books/content?id=hlb_sM1AN0gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';
  // fill our template with information(it must be an object)
  var newHTML = template({title: title, description: description, author: author, imageLink: imageLink});
  // append our new html to the page
  $('.book').append(newHTML);
  
};

//--------EVENTS

// fech a book
$('.search').on('click', function () {
  // isbn = '0439023521'
  var isbn = $('#isbn-search').val();
  fetch(isbn)
});

