const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Test = require("../model/Test");
const Teacher = require("../model/Teacher");
const User = require("../model/User");
require("dotenv").config();

/**
 * @method - GET
 * @param - /tests
 * @description - Fetching All the tests that teacher assigned using testID
 */

router.get("/tests/:profileID", auth, async (req, res) => {
  const profileID = req.params.profileID;
  console.log("teacher", profileID);
  try {
    await Test.find(
      {
        teacherId: profileID,
      },
      "submitBy className testName"
    ).exec(function (err, obj) {
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

/**
 * @method - GET
 * @param - /classes
 * @description - Fetching All the classes which are registered in Database
 */

router.get("/classes", auth, async (req, res) => {
  console.log("fetch classes");
  try {
    await User.find({}, "className -_id", function (err, obj) {
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

/**
 * @method - GET
 * @param - /profile/:profileID
 * @description - Fetching Teacher Profile from database
 */

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

/**
 * @method - POST
 * @param - /create-test
 * @description - Creating Test for the students using teacherID
 */

router.post("/create-test", auth, async (req, res) => {
  const {
    teacherId,
    testName,
    category,
    minutes,
    rules,
    className,
    outOfMarks,
    answers,
    questions,
  } = req.body;
  console.log(questions, answers, rules);
  try {
    let createTest = await Test.findOne({
      testName,
      className,
      category,
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
      answers,
      minutes,
      className,
      rules,
      outOfMarks,
      questions,
    });

    let data = await createTest.save();

    const payload = {
      data,
    };

    res.status(200).json({
      payload,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

/**
 * @method - PUT
 * @param - /update-test/:testid
 * @description - Updating Test using testID
 */

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

/**
 * @method - PUT
 * @param - /update-profile/:profileID
 * @description - Updating Teacher profile using profileID
 */

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

/**
 * @method - PUT
 * @param - /assigend-to/:testID
 * @description - Fetching classes to which the test assigned using testID
 */

router.put("/assigend-to/:testID", auth, async (req, res) => {
  const testID = req.params.testID;
  const { className } = req.body;
  try {
    await Test.updateOne(
      { _id: testID },
      {
        $addToSet: { assignedTo: [...className] },
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

/**
 * @method - DELETE
 * @param - /delete-test/:testid
 * @description - Delete a particular test using testID
 */

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
