$(document).ready(activate);


function activate() {
    window.onafterprint = function() {
        redirect()
    }

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
        } else {
            redirect('Sorry! We can\'t find your email in our list of participants!');
        }
    });


    function redirect(error) {
        var url = '/wtm2018.html';
        if (error) {
            url += '?error=' + error;
        }
        window.location = url;
    }
}

