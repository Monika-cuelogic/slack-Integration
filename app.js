var express = require('express');
var request = require('request');


var clientId = '1104988974246.1110366286997';
var clientSecret = '760e7ba54649e1534979b4ffe10c913d';
// var token = 'xoxp-1104988974246-1111721521154-1112304962739-0d2a5884f0b37b750c0ee4509f95c306';
const PORT=3000;
var app = express();

app.listen(PORT, function () {
    console.log("Example app listening on port " + PORT);
});


app.get('/',function(req,res) {

        res.sendFile('/home/monika/Documents/Monika/lockdown_tutorials/slack_integration/index.html');
});

app.get('/oauth', function(req, res) {
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {

        request({
            url: 'https://slack.com/api/oauth.v2.access',
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret},
            method: 'GET',

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});


app.get('/postMessage', function(req, res) {

  if (!req.query.token) {
      res.status(500);
      res.send({"Error": "Looks like we're not getting TOKEN."});
      console.log("Looks like we're not getting TOKEN.");
  } else {
      request({
          url: `https://slack.com/api/chat.postMessage?token=${req.query.token}&channel=${req.query.channel}&text=${req.query.text}`, //URL to hit
          method: 'POST'

      }, function (error, response, body) {
          if (error) {
              console.log(error);
          } else {
              res.json(body);

          }
      })
  }
});