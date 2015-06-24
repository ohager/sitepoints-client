var _spc = _spc || {};
_spc.PointTracker = function () {
    var intervalHandle;
    var point;
    var oldMouseMoveHandler = window.onmousemove;
    var oldMouseClickHandler = window.onclick;

    var track = function(e, oldHandler){
        point = {
            x : e.screenX,
            y : e.screenY,
            url : window.href,
            timestamp : Date.now()
        };

        if(oldHandler){
            oldHandler(e);
        }
    };

    this.startClickTracking = function(listener){
        window.onclick = function(e){
            track(e, oldMouseClickHandler);
            listener(point);
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
            listener(point);
        }, interval);
    };

    this.stopIntervalTracking = function() {
        clearInterval(intervalHandle);
        window.onmousemove = oldMouseMoveHandler;
    };

};

