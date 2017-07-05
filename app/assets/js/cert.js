var cert = {
    initialize: function() {
        var _this = this;
        var eventName = this._getQueryParameter('event');
        if (!eventName) {
            window.location = '/';
        }
        this.eventName = eventName;
        var orderId = this._getQueryParameter('order');
        if (!orderId) {
            window.location = '/?event=' + eventName;
        }
        orderId = orderId.replace('#', '');
        var eventInfoPromise = this._getEventInfo(eventName);
        eventInfoPromise.then(function(info) {
            if (!info) {
                window.location = '/';       
            }
            _this.event = info;
            var eventId = info.eventbrite_id;
            _this._getEventBriteInfo(eventId, orderId);
        });

    },

    _getQueryParameter: function(name) {
        var url = window.location.search;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    _getEventInfo: function(eventName) {
        return new Promise(function(resolve, reject) {
            var ref = window.firebase.database().ref('events/' + eventName);
            ref.once('value').then(function(data) {
                var info = data.val();
                resolve(info);
            });
        });
    },

    _getEventBriteInfo: function(eventbriteId, orderId) {
        var _this = this;
        var apiEndPoint = 'https://www.eventbriteapi.com/v3/orders/' + orderId +
            '/?token=' + 'MA54QS2FTNFGVCOEJ3HJ';
        $.ajax({
            url: apiEndPoint,
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer MA54QS2FTNFGVCOEJ3HJ');
            },
            success: function(data) {
                if (data.event_id == eventbriteId) {
                    _this._displayCert(data.name);
                }   else {
                    window.location = '/?event=' + _this.eventName + '&error=Invalid Order';
                }
            },
            error: function(e) {
                window.location = '/?event=' + _this.eventName + '&error=Invalid Order';
            }
        });
    },

    _displayCert: function(name) {
        $('#name').text(name);
        $('#name').css({'top': this.event.offset_top + 'px'});
        $('img').attr('src', '/assets/img/cert/' + this.event.cert_name);
        $('img').removeClass('hidden');
        window.print();
        window.location = '/?event=' + this.eventName;
    }

};
cert.initialize();