const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helper/validation")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { generateToken } = require("../helper/tokens")
const { sendVerificationEmail } = require("../helper/mailer")

const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    password,
    email,
    bYear,
    bMonth,
    bDay,
    gender,
  } = req.body

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Email is not valid",
    })
  }
  const check = await User.findOne({ email })

  if (check) {
    return res.status(400).json({
      message:
        "The email address already exists, try with a different email address",
    })
  }

  if (!validateLength(first_name, 3, 30)) {
    return res.status(400).json({
      message: "First name must be between 3 and 30 characters",
    })
  }

  if (!validateLength(last_name, 3, 30)) {
    return res.status(400).json({
      message: "Last name must be between 3 and 30 characters",
    })
  }

  if (!validateLength(password, 6, 40)) {
    return res.status(400).json({
      message: "Password must be between 6 and 40 characters",
    })
  }

  const cryptedPassword = await bcrypt.hash(String(password), 12)
  // https://developers.google.com/oauthplayground
  let tempUsername = first_name + last_name
  let newUsername = await validateUsername(tempUsername)

  try {
    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      password: cryptedPassword,
      email,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save()

    const emailVerificationToken = generateToken(
      {
        id: user._id.toString(),
      },
      "30m"
    )

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`

    sendVerificationEmail(user.email, user.first_name, url)
    const token = generateToken(
      {
        id: user._id.toString(),
        name: user.first_name,
      },
      "7d"
    )

    res.json({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
}

exports.activateAccount = async (req, res) => {
  // get params
  // const { token } = req.params
  const { token } = req.body
  const user = jwt.verify(token, process.env.TOKEN_SECRET)

  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    })
  }

  const check = await User.findById(user.id)

  if (!check) {
    return res.status(400).json({
      message: "Invalid token",
    })
  }

  if (check.verified == true) {
    return res.status(400).json({
      message: "Your account is already verified",
    })
  } else {
    await User.findByIdAndUpdate(user.id, {
      verified: true,
    })

    return res.status(200).json({
      message: "Your account has been verified",
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Email is not valid",
    })
  }

  const user = await User.findOne({
    email,
  })

  if (!user) {
    return res.status(400).json({
      message:
        "The email address does not exist, try with a different email address",
    })
  }

  if (user.verified == false) {
    return res.status(400).json({
      message: "Please activate your email",
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Password is not valid",
    })
  }

  const token = generateToken(
    {
      id: user._id.toString(),
    },
    "7d"
  )

  res.status(200).json({
    id: user._id,
    username: user.username,
    picture: user.picture,
    first_name: user.first_name,
    last_name: user.last_name,
    token: token,
    message: "Login successful",
  })
}
// XUQwt=Lz5g2Lsjv&ytN7/CqFG=kA8S
