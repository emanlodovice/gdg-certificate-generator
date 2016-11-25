var event_id = '28517412348';

var search = window.location.search;
var key = '?order=';
var index = search.indexOf(key);
if (index < 0) {
    window.location = '/';
}
var orderId = decodeURIComponent(search.substring(index + key.length));
orderId = orderId.replace('#', '');

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
            $('#name').text(data.name);
            $('img').removeClass('hidden');
            window.print();
            window.location = '/';
        }   else {
            window.location = '/?error=Invalid Order';
        }
    },
    error: function() {
        window.location = '/?error=Invalid Order';
    }
});