var search = window.location.search;
var key = '?error=';
var index = search.indexOf(key);
if (index >= 0) {
    var errorMessage = decodeURIComponent(search.substring(index + key.length));
    $('.error').text(errorMessage).removeClass('hidden');
}