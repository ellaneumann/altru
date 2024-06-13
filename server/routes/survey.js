var express = require("express");
var axios = require("axios");
var router = express.Router();

let UserPrefs = require("../models/user.prefs.model");

/* GET? survey results. */
router.post("/updateUserPrefs", function (req, res, next) {
  const filter = { userId: "0" };
  const update = { prefs: req.body };

  let doc = UserPrefs.findOneAndUpdate(
    filter,
    update,
    {
      useFindAndModify: false,
      upsert: true,
      returnOriginal: false,
    },
    function (err) {
      console.log(err);
    }
  );

  // doc
  //   .save()
  //   .then(() => res.json("User added!"))
  //   .catch((err) => {
  //     console.log("PAPA?!", err);
  //     res.status(400).json("Error: " + err);
  //   });

  res.send("OK");
});

router.get("/getFilteredNonProfits", async function (req, res, next) {
  const docs = await UserPrefs.find({ userId: "0" });

  let nonProfits = [];

  for (let i = 0; i < docs[0].prefs.length; i++) {
    let pref = docs[0].prefs[i];
    if (pref.prefWeight > 2 && !"local money time".includes(pref.prefDesc)) {
      let searchQueryInsert = pref.prefDesc.replace(/ /g, "%20");

      let response = await axios
        .get(
          "https://api.data.charitynavigator.org/v2/Organizations?app_id=700cb4b4&app_key=34dd0899d430f0b4d70a8d365cadb1bc&search=" +
            searchQueryInsert +
            "&rated=true"
        )
        .catch((error) => {
          console.log(error);
        });

      nonProfits = nonProfits.concat(response.data);
    }
  }

  nonProfits
    .map((nonProfit) => nonProfit.currentRating.rating)
    .sort((a, b) => a > b);

  res.json(nonProfits);
});

module.exports = router;
