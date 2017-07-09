var home = {
    initialize: function() {
        var eventName = this._getQueryParameter('event');
        this._handleError();
        if (!eventName) {
            this._showInvalidEventError();
            return;
        }
        this.eventName = eventName;
        var eventInfoPromise = this._getEventInfo(eventName);
        var _this = this;
        eventInfoPromise.then(function(data) {
            _this._updatePageWithInfo(data);
        });
    },

    _updatePageWithInfo: function(eventInfo) {
        if (!eventInfo) {
            this._showInvalidEventError();
            return;
        }
        $('.loading').addClass('hidden');
        $('.main-content img').attr('src', '/assets/img/logo/' + eventInfo.logo_name);
        var form = $('.main-content form');
        $('.main-content input[name="event"]').val(this.eventName);
        if (eventInfo.hasOwnProperty('feedback_url')) {
            $('#feedback a').attr('href', eventInfo.feedback_url).text(eventInfo.feedback_url);
            $('#feedback').removeClass('hidden');
        }
        $('.main-content').removeClass('hidden');
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

    _handleError: function() {
        var errors = this._getQueryParameter('error');
        if (errors) {
            $('#error-container').text(errors).removeClass('hidden');
        }
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

    _showInvalidEventError: function() {
        $('.loading').addClass('hidden');
        $('.main-content').addClass('hidden');
        $('.error').removeClass('hidden');
    }
};

home.initialize();
