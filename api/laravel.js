const data = require("../data/laravelQuestions.json");

export default function handler(req, res) {
  res.status(200).json(data);
}
