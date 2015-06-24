/**
 * Created by oliver on 23.06.2015.
 */
var _spc = _spc || {};
(function(ns){

    var tracker = new ns.PointTracker();
    var storage = new ns.Storage(new ns.Config());
    tracker.startClickTracking(function(point){
        storage.push(point);
        console.log(JSON.stringify(storage.data()));
    })


})(_spc);