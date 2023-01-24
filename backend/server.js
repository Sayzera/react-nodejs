const express = require("express")
const mongoose = require("mongoose")
const { readdirSync } = require("fs")
const cors = require("cors")
const app = express()

// process.env.XX diyerek .env dosyasındaki değişkenleri kullanabiliriz
const dotenv = require("dotenv")
const { corsSecurityOptions } = require("./helper/security")
dotenv.config()
mongoose.set("strictQuery", false)
// app.use(cors(options))

app.use(cors(corsSecurityOptions))
app.use(express.json()) // json formatında gelen verileri okuyabilmek için

// Dinamik olarak route dosyalarını okuyup kullanıyoruz
readdirSync("./routes").map((r) => {
  app.use("/", require("./routes/" + r))
})

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => "error connecting to mongodb " + err)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT + "")
})

// console.log((+new Date() * Math.random()).toString(36).replace(".", ""))
