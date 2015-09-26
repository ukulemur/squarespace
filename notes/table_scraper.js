var dict = {};

var table = $('#table-1 tr');

table.each(function(i,e){
  if(i > 2) {
    var state = $(this).find("td:first-child p").text();
    var id = $(this).find("td:nth-child(4) p").text();

    dict[state]=id
  }
});