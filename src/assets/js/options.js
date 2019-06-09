jQuery(function($){
  var page = $('#options-page'); 
  var save = page.find('.save')
  var remove = page.find('.clean')
  var tpl = page.find('.template');
  tpl.hide();
  var id = 0;

  function createQuery(uk, id){
    if ($('#row-' + id).length > 0){
      return $('#row-' + id);
    }
    var c = tpl.clone();
    c.removeClass('template');
    tpl.parent().append(c);
    c.show();
    c.find('.value').attr('name', 'value-' + uk + '-'  + id);

    return c;
  }

  function cleanLocalStorage() {
    localStorage.removeItem('url');
    localStorage.removeItem('postal');
    for (var k in localStorage){
      if (k.match(/^(query|url|value)-(\d+)-(\d+)/)){
        var uk = RegExp.$2;
        var id = RegExp.$3;
        localStorage.removeItem('query-' + uk + '-'  + id);
        localStorage.removeItem('value-' + uk + '-'  + id);
      }
    };
  }

  remove.click(function(){
    if (confirm('Are you sure you want to clean all the data?')) {
      cleanLocalStorage()
      confirm('[Yooo] All Done 💪');
      location.reload();
    }
  });
  
  page.find('input[type=checkbox]').each(function(){
    var key = $(this).attr('name');
    localStorage[key] = localStorage[key] || '';
    if (localStorage[key]){
      $(this).attr('checked', 'checked');
    }
    $(this).change(function(){
      if ($(this).attr('checked')){
        localStorage[key] = 'checked';
      }else{
        localStorage[key] = '';
      }
    });
  });

  for (var k in localStorage){
    if (k.match(/^(query|url|value)-(\d+)-(\d+)/)){
      var type = RegExp.$1;
      var uk = RegExp.$2;
      var id = RegExp.$3;
      var c = createQuery(uk, id);
      c.find('.' + type).val(localStorage[k]);
    }
  };

  function placeholderCheck(values){
    var checked = 0
    for (var idx = 0; idx < values.length; idx++){
      if (values[idx].value != ""){
        checked += 1
      }
    }
    if (checked == values.length){
      return true
    }
    return false
  };

  save.click(function(){
    cleanLocalStorage()
    var placeholders = page.find('input[type=text]').context.getElementsByClassName("value");

    if (placeholderCheck(placeholders)){
      var queries = page.find('input[type=text]').context.getElementsByClassName("query");
      var e = document.getElementsByClassName("prefecture-url")[0];
      var uk = e.options[e.selectedIndex].getAttribute("subvalue");
      var url = e.value;
      localStorage["postal"] = uk;
      localStorage["url"] = url;

      for (var idx = 0; idx < placeholders.length; idx++){
          var vk = "value-" + uk + "-" + (idx+1);
          var val = placeholders[idx].value;
          localStorage[vk] = val;

          var qk = "query-" + uk + "-" + (idx+1);
          var query = queries[idx].defaultValue;
          localStorage[qk] = query;
      };
      confirm('[Hola] Data Saved 😇');
    } else {
      confirm('[Oops] You need to finish the form before you save it 🙇');
    }
  });
});
