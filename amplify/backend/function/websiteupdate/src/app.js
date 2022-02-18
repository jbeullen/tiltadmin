/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const aws = require("aws-sdk");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
const s3 = new aws.S3();
const cloudfront = new aws.CloudFront();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/calendar", function (req, res) {
  const fileName = "./calendar.mustache";
  let resolved;
  if (process.env.LAMBDA_TASK_ROOT) {
    resolved = path.resolve(process.env.LAMBDA_TASK_ROOT, fileName);
  } else {
    resolved = path.resolve(__dirname, fileName);
  }
  try {
    const template = fs.readFileSync(resolved, "utf8");
    const rendered = Mustache.render(template, {
      rides: req.body,
      style: function () {
        return new Date() > new Date(this.date) ? "archive hidden" : "calendar";
      },
      day: function () {
        return moment(this.date)
          .tz("Europe/Brussels")
          .locale("nl")
          .format("dddd DD/MM/YYYY");
      },
      time: function () {
        return moment(this.date).tz("Europe/Brussels").format("HH:mm");
      },
      name: function () {
        return !this.gpx
          ? this.description
          : `<a href="${this.gpx}" target="_blank"> ${this.description} </a>`;
      },
    });

    const s3Params = {
      Bucket: process.env.S3_BUCKET_WEBSITE,
      Key: "kalender.html",
      Body: rendered,
      CacheControl: "max-age=0,no-cache,no-store,must-revalidate",
      ContentType: "text/html",
    };

    s3.putObject(s3Params, function (err, data) {
      if (err) {
        console.log("S3 put failed");
        console.log(err, err.stack);
        res.status(200).json({
          message:
            "Kalender is niet aangepast. Probeer opnieuw of contacteer Jerre",
          error: JSON.stringify(err.stack),
        });
      } else {
        const cloudFrontParams = {
          DistributionId: process.env.CLOUD_FRONT_DISTRIBUTION_ID_WEBSITE,
          InvalidationBatch: {
            CallerReference: uuidv4(),
            Paths: {
              Quantity: 1,
              Items: ["/kalender.html"],
            },
          },
        };
        cloudfront.createInvalidation(cloudFrontParams, function (err, data) {
          if (err) {
            console.log("CloudFront invalidation failed");
            console.log(err, err.stack);
          } else {
            res.json({
              message:
                "Kalender aangepast, de wijziging staan binnen een uurtje op de website.",
            });
          }
        });
      }
    });
  } catch (error) {
    console.log("Template generation failed");
    console.log(error);
    res.status(200).json({
      message:
        "Kalender is niet aangepast. Probeer opnieuw of contacteer Jerre",
      error: JSON.stringify(error.stack),
    });
  }
});

app.post("/leaderboard", function (req, res) {
  // Add your code here
  res.json({
    success: "leaderboard call succeed!",
    url: req.url,
    body: req.body,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
