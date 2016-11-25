$(document).ready(activate);

function activate() {
    var ref = window.firebase.database().ref('walk-in/');

    ref.on('value', function(data) {
        var volunteers = data.val();
        $('ul').empty();
        for (var key in volunteers) {
            addPerson(key, volunteers[key]);
        }
    });

    function addPerson(id, name) {
        var url = '/certificate.html?id=' + id;
        var template = '<li><span class="triangle"></span><a href="' + url + '">' + name + '</a></li>';
        $('ul').append(template);
    }
}

