const express = require("express");
const studentRoutes = express.Router();
const students = require("../../Model/Student");

studentRoutes.get("/", (req, res) => {
  try {
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: `bad gateway` });
  }
});
studentRoutes.get("/:id", (req, res) => {
  const isFound = students.some(
    student => student.ID == parseInt(req.params.id)
  );
  console.log(isFound);
  try {
    if (isFound) {
      res
        .status(200)
        .json(
          students.filter(student => student.ID == parseInt(req.params.id))
        );
    } else {
      res
        .status(400)
        .json({ error: `student not found for the input id ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ error: `bad gateway` });
  }
});
studentRoutes.post("/", (req, res) => {
  const student = {
    ID: req.body.ID,
    Name: req.body.Name,
    Gender: req.body.Gender,
    Class: req.body.Class
  };
  if (!req.body.ID && !req.body.Name) {
    return res.status(400).json({ error: "bad request" });
  } else {
    students.push(student);
    return res.status(200).json(student);
  }
});
studentRoutes.delete("/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(200).json({ error: "bad request" });
  } else {
    // get index of object with id:37
    var removeIndex = students
      .map(function(student) {
        return student.ID;
      })
      .indexOf(req.params.id);
    // remove object
    students.splice(removeIndex, 1);
    res.status(200).json({message:'deleted',students});
  }
});
module.exports = studentRoutes;
