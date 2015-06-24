/**
 * Created by oliver on 23.06.2015.
 */
var _spc = _spc || {};
_spc.main = function () {
    console.log("MAIN!");
    var tracker = new _spc.PointTracker();
    var storage = new _spc.Storage(new _spc.Config());
    tracker.startClickTracking(function (point) {
        storage.push(point);
        console.log(JSON.stringify(storage.data()));
    })
};
