var config = {
    apiKey: "AIzaSyC09C-ufT_h8ZjjwXx_10I0zRVxbckmlcI",
    authDomain: "gdg-cebu-certificate.firebaseapp.com",
    databaseURL: "https://gdg-cebu-certificate.firebaseio.com",
    storageBucket: "gdg-cebu-certificate.appspot.com",
    messagingSenderId: "795264595289"
};
firebase.initializeApp(config);


var ref = firebase.database().ref('volunteers/');

ref.on('value', function(data) {
    var volunteers = data.val();
    $('ul').empty();
    for (var key in volunteers) {
        addVolunteer(key, volunteers[key]);
    }
});


function addVolunteer(id, name) {
    var template = '<li><span class="triangle"></span><a href="">' + name + '</a></li>';
    $('ul').append(template);
}

