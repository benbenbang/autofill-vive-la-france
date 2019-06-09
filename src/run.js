// This is for fetching data from local storage to the matched prefecture url and form
chrome.extension.sendRequest({
    "action": "getOptions",
    "args": []
}, function(response){
    var queries = {}
    var url = response["url"]
    var postal = response["postal"]

    for (var k in response){
        if (k.match(/^(query|value)-(\d+)-(\d+)/)){
            var type = RegExp.$1;
            var uk = RegExp.$2;
            var id = RegExp.$3;
            if (uk == postal){
                queries[id] = queries[id] || {}
                queries[id][type] = response[k];
            }
        }
    };
    for (id in queries){
        var q = queries[id]
        if (document.location.href.match(new RegExp(url))){
            $(q['query']).val(q['value']);
        }
    }
});