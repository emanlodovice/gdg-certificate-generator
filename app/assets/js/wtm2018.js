var home = {
    initialize: function() {
        this._handleError();
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
        console.log(errors);
        if (errors) {
            $('#error-container').text(errors).removeClass('hidden');
        }
    }
};

home.initialize();
