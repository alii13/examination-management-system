const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Test = require("../model/Test");
const Teacher = require("../model/Teacher");
const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.get("/tests/", auth, async (req, res) => {
  try {
    await Test.find({}).exec(function (err, obj) {
      if (err) {
        return res.status(400).json({ err });
      } else {
        return res.status(200).json({
          obj,
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in fetching Tests");
  }
});

router.get("/classes/", auth, async (req, res) => {
  try {
    await User.find({}, "className -_id", function (err, obj) {
      if (err) {
        return res.status(400).json({ err });
      } else {
        return res.status(200).json({
          ...obj,
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in fetching Tests");
  }
});

router.get("/profile/:profileID", auth, async (req, res) => {
  const profileID = req.params.profileID;

  try {
    await Teacher.findOne({
      _id: profileID,
    })
      .populate("profileInfo")
      .exec(function (err, obj) {
        if (err) {
          return res.status(400).json({ err });
        } else {
          return res.status(200).json({
            obj,
          });
        }
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in fetching Student Data");
  }
});

router.post("/create-test", auth, async (req, res) => {
  const {
    teacherId,
    testName,
    category,
    minutes,
    rules,
    className,
    outOfMarks,
    questions,
  } = req.body;
  try {
    let createTest = await Test.findOne({
      testName,
      teacherId,
    });
    if (createTest) {
      return res.status(400).json({
        msg: "Test Already Created",
      });
    }

    createTest = new Test({
      teacherId,
      testName,
      category,
      minutes,
      className,
      rules,
      outOfMarks,
      questions,
    });

    await createTest.save();

    const payload = {
      createTest,
    };

    res.status(200).json({
      payload,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

router.put("/update-test/:testid", auth, async (req, res) => {
  const testID = req.params.testid;
  console.log(testID);
  const questionsData = req.body.questions;
  try {
    const testData = await Test.findOneAndUpdate(
      { _id: testID },
      { questions: questionsData },
      function (err, updatedData) {
        if (err) {
          return res.status(400).json({ message: "failed to update document" });
        } else {
          return res.status(200).json({
            message: "questions succesfully updated",
          });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Updating");
  }
});

router.put("/update-profile/:profileID", auth, async (req, res) => {
  const profileID = req.params.profileID;
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const testData = await Teacher.findOneAndUpdate(
      { _id: profileID },
      { ...req.body },
      function (err, updatedData) {
        if (err) {
          return res.status(400).json({ message: "failed to update profile" });
        } else {
          console.log(updatedData);
          return res.status(200).json({
            message: "profile succesfully updated",
          });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Updating Profile");
  }
});

router.put("/assigend-to/:testID", auth, async (req, res) => {
  const testID = req.params.testID;
  const { className } = req.body;
  try {
    await Test.updateOne(
      { _id: testID },
      { 
        $addToSet: { assignedTo: [...className] }
       },
      function (err, updatedData) {
        if (err) {
          return res
            .status(400)
            .json({ message: "failed to update assigendStudents" });
        } else {
          return res.status(200).json({
            updatedData,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).send("Error in Updating");
  }
});

router.delete("/delete-test/:testid", auth, async (req, res) => {
  const testID = req.params.testid;
  console.log(testID);
  try {
    const testData = await Test.findByIdAndDelete(testID, function (err) {
      if (err) {
        return res.status(400).json({ message: "failed to delete document" });
      } else {
        return res.status(200).json({
          message: "successfully deleted",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Deleting");
  }
});


module.exports = router;
