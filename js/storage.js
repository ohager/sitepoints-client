function SitepointsClientStorage(config){

    var self  = this;
    var serverHost = config.server;
    var cacheSize = config.cacheSize;
    var cacheExpiry = config.cacheExpiry * 1000; // in seconds
    var timeoutHandle = undefined;
    var storage = [];

    var clear = function(){
        storage = [];
    };

    this.push = function(coords){
        storage.push(coords);

        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout( function(){
            self.flush();
        }, cacheExpiry);

        if(storage.length >= cacheSize){
            self.flush();
        }
    };


    this.flush = function(){
        console.log("Flushed Storage");
        // pushes to server
        clear();
    };
}
