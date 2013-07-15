var request = require('request'),
    URI = require('URIjs'),
    _ = require('underscore');

var meetupApiKey = 'xxxxINSERT YOUR MEETUP API KEY HERE';



var url = new URI('https://api.meetup.com/2/rsvps');
url.addQuery("key", meetupApiKey);
url.addQuery("event_id", "125332992");  //Santa-Barbara-JavaScript-Meetup first event (kickoff)

var requestObject = {
  url: url.toString(),
  json: true    //turns the body into a JSON response
}

var callback = function(data) {
  var members = _(data).chain()
    .filter(function(member){
      return member.response === 'yes';  //we only want positive RSVP folks!
    })
    .map(function(member){
      return member.member;
    })
    .value();
  
  var randomNumber = Math.floor(Math.random() * members.length);  
  
  console.log('There are ' + members.length + ' members who RSVPed for this event');  
  console.log(members);  
  console.log("------------------------------------");
  console.log("The random zero-based array drawing is number " + randomNumber + " who happens to be " + members[randomNumber].name);
};  
  
request(requestObject, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    callback(body.results);
  } else {
    console.log(error);
  }
})





