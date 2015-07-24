var _spc = _spc || {};
_spc.PointTracker = function () {
    var intervalHandle;
    var point = {};
    var oldMouseMoveHandler = window.onmousemove;
    var oldMouseClickHandler = window.onclick;


    var track = function(e, oldHandler){
        point.x = e.screenX;
        point.y = e.screenY;
        point.url = window.location.href;
        point.created = Date.now();

        if(oldHandler){
            oldHandler(e);
        }
    };

    var getPoint = function(){
        return {
            x : point.x,
            y : point.y,
            url : point.url,
            created : point.created
        };
    };

    this.startClickTracking = function(listener){
        window.onclick = function(e){
            track(e, oldMouseClickHandler);
            listener(getPoint());
        };
    };

    this.stopClickTracking = function(){
        window.onclick = oldMouseClickHandler;
    };

    this.startIntervalTracking = function(listener,interval) {

        window.onmousemove = function(e){
            track(e, oldMouseMoveHandler);
        };

        clearInterval(intervalHandle);
        setInterval(function () {
            if(!point) return;

            listener(getPoint());
        }, interval);
    };

    this.stopIntervalTracking = function() {
        clearInterval(intervalHandle);
        window.onmousemove = oldMouseMoveHandler;
    };

};

