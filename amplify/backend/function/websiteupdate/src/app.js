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

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

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
      Bucket: "wtc-tilt.be",
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
          DistributionId: "E1RZ9P079EZ5I1",
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
                "Kalender is aangepast. Binnen een kwartier is dit zichtbaar. Vergeet niet te refreshen!!!",
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
  const ridersWithPointsSorted = req.body.members
    .map((rider) => {
      const points = req.body.attendance
        .filter((att) => att.id === rider.id)
        .map((att) => att.points)
        .reduce((sum, number) => {
          return sum + number;
        }, 0);
      const rides = req.body.attendance
        .filter((att) => att.id === rider.id)
        .map((att) => att.points)
        .reduce((sum, number) => {
          return sum + 1;
        }, 0);
      return {
        id: rider.id,
        first_name: rider.first_name,
        last_name: rider.last_name,
        points: points,
        rides: rides,
        kom: false,
      };
    })
    .sort((a, b) => {
      return (
        -(a.points - b.points) ||
        `${a.last_name} ${a.first_name}`.localeCompare(
          `${b.last_name} ${b.first_name}`
        )
      );
    });
  const maxPoints = ridersWithPointsSorted[0].points;

  const leaderboard = ridersWithPointsSorted.map((rider) => {
    if (maxPoints !== 0 && rider.points === maxPoints) {
      rider.kom = true;
    }
    return rider;
  });

  const fileName = "./leaderboard.mustache";
  let resolved;
  if (process.env.LAMBDA_TASK_ROOT) {
    resolved = path.resolve(process.env.LAMBDA_TASK_ROOT, fileName);
  } else {
    resolved = path.resolve(__dirname, fileName);
  }
  try {
    const template = fs.readFileSync(resolved, "utf8");
    const rendered = Mustache.render(template, {
      riders: leaderboard,
      icon: function () {
        return this.kom && this.points != 0
          ? `<img src="img/kom.png"/>`
          : `&nbsp;`;
      },
      name: function () {
        return `${this.first_name} ${this.last_name}`;
      },
    });

    const s3Params = {
      Bucket: "wtc-tilt.be",
      Key: "klassement.html",
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
            "Klassement is niet aangepast. Probeer opnieuw of contacteer Jerre",
          error: JSON.stringify(err.stack),
        });
      } else {
        const cloudFrontParams = {
          DistributionId: "E1RZ9P079EZ5I1",
          InvalidationBatch: {
            CallerReference: uuidv4(),
            Paths: {
              Quantity: 1,
              Items: ["/klassement.html"],
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
                "Klassement is aangepast. Binnen een kwartier is dit zichtbaar. Vergeet niet te refreshen!!!",
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
        "Klassement is niet aangepast. Probeer opnieuw of contacteer Jerre",
      error: JSON.stringify(error.stack),
    });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
