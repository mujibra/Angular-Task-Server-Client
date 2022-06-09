const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "Unauthorized":
      res.status(401).json({ message: "Unauthorized" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Data Not FOund" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "Forbidden" });
      break;
    case "BadRequest":
      res.status(400).json({ message: "Bad Request" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
