// ref. http://d.hatena.ne.jp/umezo/20091115/1258291572
// It's a general template for storing data in local storage in chrome
var core = {
    // @return Object
    "getOptions": function(){
    console.log('getOptions', localStorage);
    return localStorage;
    },
}

window.onload = function(){
    /*
        * request: {
        *   action: "...",
        *   args: [a, b, c, ...]
        * }
    */
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    var ret = (core[request.action] || function(){}).apply(this, request.args);
    sendResponse(ret);
    });
}
