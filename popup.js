document.addEventListener('DOMContentLoaded', function () {
  var ul = document.querySelector('#js-history-list');
  var html = '';
  var microsecondsPerDay = 1000 * 60 * 60 * 24
  var searchStartDate = (new Date).getTime() - microsecondsPerDay * 365
  var query = {
    text: '',
    startTime:searchStartDate,
    maxResults:10000
  };
  chrome.history.search(query, function (results) {
    var array = {}
    var count = {}
    results.forEach(function (result) {
      array[result.title]=result.url
      if(count[result.title]){count[result.title]+=1;}
      else{count[result.title]=1;}
    });
    var keys=[];
    var items = Object.keys(count).map(function(key) {
      return [key, count[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    for(var item in items)
    {
      if (items[item][0].lenght<2)continue;
      if (items[item][1]<2)continue;
      html += '<li>' +
                '<a href="' + array[items[item][0]] + '" target="_blank">' +
                  items[item][0] + " : " + items[item][1]
                '</a>' +
              '</li>';

    }
    ul.innerHTML = html;
  });
});