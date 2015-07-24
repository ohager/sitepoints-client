var _spc = _spc || {};
_spc.Storage = function (config) {

    var self = this;
    var verbose = config.verbose;
    var serverHost = config.serverHost;
    var cacheSize = config.cacheSize;
    var cacheTimeout = config.cacheTimeout * 1000; // in seconds
    var timeoutHandle;
    var storage = [];

    var clear = function () {
        storage = [];
        clearTimeout(timeoutHandle);
    };

    function print(msg){

        function getTimeStamp(){
            var time = new Date();
            return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '\'' + time.getMilliseconds();
        }

        if(verbose){
            console.log("[" + getTimeStamp()  + "] Sitepoints - " + msg);
        }
    }

    this.push = function (coords) {
        print(" Stored P(" + coords.x + ", " + coords.y + ") @ " + coords.created + ")");
        storage.push(coords);

        if(cacheTimeout > 0){
            clearTimeout(timeoutHandle);
            timeoutHandle = setTimeout(function () {
                self.flush();
            }, cacheTimeout);
        }

        if (storage.length >= cacheSize) {
            clearTimeout(timeoutHandle);
            self.flush();
        }
    };

    this.data = function () {
        return storage.slice();
    };

    this.flush = function (async) {

        var targetUrl = serverHost + '/restapi/sitepoint?k=' + config.apikey;
        print("Flushing " + storage.length + " elements to " + targetUrl + "...");
        if(storage.length === 0) {
            print("Flush skipped");
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                print("Flushed successfully");
                if(config.onflush){
                    config.onflush(xhr);
                }
            }
        };

        xhr.open('POST', targetUrl, (async === undefined || async === true) );
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(storage));

        clear();
    };

    this.blockingFlush = this.flush.bind(null, false);
};
