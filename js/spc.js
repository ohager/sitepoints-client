/**
 * Created by oliver on 23.06.2015.
 */
var _spc = _spc || {};
_spc.main = function (myspc) {
    var config = new _spc.Config(myspc);
    var tracker = new _spc.PointTracker();
    var storage = new _spc.Storage(config);

    var oldUnloadHandler = window.onunload;

    function pushToStorage(point){
        storage.push(point);
    }

    tracker.startClickTracking(pushToStorage);
    if(config.mouseTracking){
        tracker.startIntervalTracking(pushToStorage,config.trackingInterval);
    }

    window.onunload = function(e){
        storage.blockingFlush();
        if(oldUnloadHandler){
            oldUnloadHandler(e);
        }
    };


};
