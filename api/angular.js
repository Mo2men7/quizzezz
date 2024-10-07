const data = require("../data/angularQuestions.json");

export default function handler(req, res) {
  res.status(200).json(data);
}
