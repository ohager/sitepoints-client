var sitepointsclient = sitepointsclient || {};
sitepointsclient.Storage = function (config) {

    var self = this;
    var serverHost = config.serverHost;
    var cacheSize = config.cacheSize;
    var cacheTimeout = config.cacheTimeout * 1000; // in seconds
    var timeoutHandle = undefined;
    var storage = [];

    var clear = function () {
        storage = [];
    };

    this.push = function (coords) {
        storage.push(coords);

        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(function () {
            self.flush();
        }, cacheTimeout);

        if (storage.length >= cacheSize) {
            self.flush();
        }
    };

    this.data = function () {
        return storage.slice();
    };

    this.flush = function () {
        console.log("Flushed Storage");
        // pushes to server
        clear();
    };
};
