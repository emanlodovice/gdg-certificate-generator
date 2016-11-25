$(document).ready(activate);


function activate() {
    var search = window.location.search;
    var key = '?id=';
    var index = search.indexOf(key);
    if (index < 0) {
        redirect();
    }
    var id = search.substring(index + key.length);

    var ref = window.firebase.database().ref('volunteers/' + id);

    ref.once('value').then(function(info) {
        var value = info.val();
        if (value !== null) {
            $('#name').text(value);
            $('img').removeClass('hidden');
            window.print();
            redirect();
        } else {
            redirect();
        }
    });


    function redirect() {
        window.location = '/volunteers.html';
    }
}

