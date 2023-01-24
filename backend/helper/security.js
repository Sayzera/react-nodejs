exports.corsSecurityOptions = (req, res) => {
  let allowed = ["http://localhost:3000", "http://localhost:8000"]
  let temp
  let origin = req.header("Origin")
  if (allowed.includes(origin)) {
    temp = {
      origin: true,
      optionsSuccessStatus: 200,
    }
  } else {
    temp = {
      origin: "Stupid",
    }
  }
  res(null, temp)
}
