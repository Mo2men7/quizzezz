const data = require("../data/reactQuestions.json");

export default function handler(req, res) {
  res.status(200).json(data);
}
