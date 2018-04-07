// post javascript for home handlebars
request("http://www.nytimes.com", function(error, response, html) {

  var $ = cheerio.load(html);

  var results = [];

  $("h2.story-heading").each(function(i, element) {
    $("p.summary").each(function(i, element) {

  var summary = $(element).text();

  var title = $(element).text();
  var link = $(element).parent().attr("href");

  results.push({
    title:title,
    link:link,
    summary:summary
  });
  });
});

console.log(results);
});
