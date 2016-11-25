var event_id = '28517412348';
$(document).ready(activate);

function activate() {
    var search = window.location.search;
    var key = '?order=';
    var index = search.indexOf(key);
    if (index >= 0) {
        var orderId = decodeURIComponent(search.substring(index + key.length));
        orderId = orderId.replace('#', '');
        handleEventBriteCert(orderId);
    } else {
        key = '?id=';
        index = search.indexOf(key);
        if (index >= 0) {
            var id = decodeURIComponent(search.substring(index + key.length));
            handleWalkInCert(id);
        }   else {
            redirect();
        }
    }
}

function displayCert(name) {
    $('#name').text(name);
    $('img').removeClass('hidden');
    window.print();
    window.location = '/';
}

function handleEventBriteCert(orderId) {
    var apiEndPoint = 'https://www.eventbriteapi.com/v3/orders/' + orderId +
        '/?token=' + 'MA54QS2FTNFGVCOEJ3HJ';

    $.ajax({
        url: apiEndPoint,
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer MA54QS2FTNFGVCOEJ3HJ');
        },
        success: function(data) {
            if (data.event_id === event_id) {
                displayCert(data.name);
            }   else {
                window.location = '/?error=Invalid Order';
            }
        },
        error: function() {
            window.location = '/?error=Invalid Order';
        }
    });
}

function handleWalkInCert(id) {
    var ref = window.firebase.database().ref('walk-in/' + id);
    ref.once('value').then(function(data) {
        var name = data.val();
        if (name !== null) {
            displayCert(name);
        } else {
            redirect();
        }
    });
}

function redirect() {
    window.location = '/';
}