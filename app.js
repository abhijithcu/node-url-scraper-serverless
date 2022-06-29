const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

var request = require('request');
var cheerio = require('cheerio');

// app.listen(process.env.PORT || 8000, process.env.NODE_IP || 'localhost');
// console.log('Navigate your brower to: http://localhost:8000');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/scarp', async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    console.log("inside fun()")
    if (!!req.body.URL) {//check if URL is there in the request
        // request the URL response
        request(req.body.URL, function (error, response, responseHtml) {

            //error check
            if (!!error) {
                res.end(JSON.stringify({ error: 'Error Occurred' }));
                return;
            }
            //define Object
            var resObj = {
                title: "",
                description: "",
                images: []
            }
            scarp = cheerio.load(responseHtml),

            title = scarp('head title').text(),
            desc = scarp('meta[name="description"]').attr('content'),
            ogImage = scarp('meta[property="og:image"]').attr('content'),
            images = scarp('img');

            if (!!title) {
                resObj.title = title;
            }
            if (!!desc) {
                resObj.description = desc;
            }
            if (!!ogImage && ogImage.length) {
                resObj.images.push(ogImage);
            }
            if (!!images && images.length) {
                for (var i = 0; i < images.length; i++) {
                    resObj.images.push(scarp(images[i]).attr('src'));
                }
            }
            // console.log(JSON.stringify(resObj), "result");
            res.end(JSON.stringify(resObj));

        });
    } else {
        res.end(JSON.stringify({ error: 'Please pass the url that needs to be scarped' }));
    }

});

module.exports.handler = serverless(app);