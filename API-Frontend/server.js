const express = require("express");
const serveStatic = require("serve-static");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const generateApiKey = require("generate-api-key").default; // https://www.npmjs.com/package/generate-api-key#uuidv5-method

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
      optionsSuccessStatus: 200, //レスポンスstatusを200に設定
    })
  );
}

// Allow the following IPs, 0-j, 1-m, 2-s, 3/4-k
const whitelist = [
  "133.62.160.115",
  "39.188.105.58",
  "133.62.160.116",
  "133.62.160.107",
  "133.62.160.100",
  //"::1"
];
const whitelistOn = false; //true: using whitelist, false: can access by any ip

app.use(serveStatic(__dirname + "/dist"));

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);

MongoClient.connect(
  "mongodb+srv://apikaylab:klab0807@cluster0.qjulket.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log(error);
    db = client.db("Firstdb");
    // app.listen(port, () => {
    //   console.log("port connected!");
    // });
  }
);

app.listen(port, () =>
  {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log("port connected!")
  });
  


// showing all data of post
app.get("/json", (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    db.collection("post")
      .find()
      .toArray((err, rlst) => {
        res.send(rlst);
      });
  }
});

//Get Opendatalist
app.get("/opendatalist", (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    db.collection("Opendata list")
      .find()
      .toArray((err, rlst) => {
        res.send(rlst);
      });
  }
});

//Get Api Key list
app.get("/apikeylist", async (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    const exist = await db
      .collection("API Keys")
      .find({
        User: req.query.user,
      })
      .toArray();

    if (Object.keys(exist).length !== 0) {
      res.send(exist);
    } else {
      res.send("NotExist");
    }
  }
});

//Download Opendata
app.get("/downloadopendata", async (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    await db
      .collection(req.query.Target)
      .find()
      .toArray((err, rlst) => {
        res.send(rlst);
      });
  }
});

//User id register
app.post("/register", (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    db.collection("User").insertOne(req.body, () => {
      console.log("User registered!");
    });
  }
});

//User id get
app.get("/userget", async (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    const exist = await db.collection("User").findOne({
      email: req.query.ID,
      password: req.query.PW,
    });
    if (exist !== null) {
      res.send("ValidUser");
    } else {
      res.send("UnvalidUser");
    }
  }
});

//Upload Opendata
app.post("/uploadopendata", async (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    const collection = req.body.uploadtitle;
    const opendata = req.body.uploadedJSON;
    const explanation = req.body.uploadexplain;
    const namecheck = await db
      .listCollections({ name: collection }, { nameOnly: true })
      .toArray();

    if (namecheck[0] === undefined) {
      db.createCollection(collection);
      db.collection(collection).insertMany(opendata, () => {
        console.log("Opendata uploaded!");
        res.send("UploadOK");
      });
      db.collection("Opendata list").insertOne({
        title: collection,
        content: explanation,
      });
    } else {
      console.log("Same collection exist in DB, cannot be uploaded");
      res.send("UploadFail");
    }
  }
});

//Api Key create
app.post("/createapikey", async (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    const APIKey = {
      User: req.body.user,
      Title: req.body.title,
      Key: generateApiKey({ method: "uuidv4", dashes: false }),
    };

    const exist = await db.collection("API Keys").findOne({
      User: req.body.user,
      Title: req.body.title,
    });

    if (exist !== null) {
      console.log("This Opendata API Key is already exist for this user");
      res.send(
        "データセット「" + req.body.title + "」のキーは既に発行されました。"
      );
    } else {
      try {
        db.collection("API Keys").insertOne(APIKey, () => {
          console.log("saved");
          res.send("発行しました！");
        });
      } catch (error) {
        console.error(error);
        res.send("Fail");
      }
    }
  }
});

//Opendata send
app.get("/getopendata", async (req, res) => {
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    const exist = await db
      .collection("API Keys")
      .findOne({ Key: req.query.ApiKey });

    if (exist !== null) {
      db.collection(exist.Title)
        .find()
        .toArray((err, rlst) => {
          res.send(rlst);
        });
    } else {
      res.send("読み込みに失敗しました．");
    }
  }
});

//usernumber
app.get("/usernumber",async(req,res)=>{
  if (whitelistOn && whitelist.indexOf(temporaryC(req)) === -1) {
    res.send("Forbidden");
  } else {
    await db.collection("Usernumber")
      .find()
      .toArray((err, rlst) => {
        res.send(rlst);
      });
  }
})

//ip check page
app.get("/ipc", (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.send(ip + " / " + typeof ip);
});

//ip check function
function temporaryC(req, res) {
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return ip;
}
