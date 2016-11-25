var ref = firebase.database().ref('volunteers/');

ref.on('value', function(data) {
    var volunteers = data.val();
    $('ul').empty();
    for (var key in volunteers) {
        addVolunteer(key, volunteers[key]);
    }
});

function addVolunteer(id, name) {
    var url = '/volunteer_cert.html?id=' + id;
    var template = '<li><span class="triangle"></span><a href="' + url + '">' + name + '</a></li>';
    $('ul').append(template);
}

