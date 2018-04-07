$(document).ready(activate);


function activate() {
    var search = window.location.search;
    var key = '?email=';
    var index = search.indexOf(key);
    if (index < 0) {
        redirect();
    }
    var email = decodeURIComponent(search.substring(index + key.length));
    if (email === '') {
        redirect();
    }

    email = email.replace(/\./g, '__dot__');

    var ref = window.firebase.database().ref('wtm2018/participants/' + email);

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
        window.location = '/wtm2018.html';
    }
}

