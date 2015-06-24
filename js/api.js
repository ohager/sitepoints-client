/**
 * Created by oliver on 23.06.2015.
 */
var sitepointsclient = sitepointsclient || {};
(function(ns){
    var storage = new ns.Storage(new ns.Config());
    storage.flush();
})(sitepointsclient);