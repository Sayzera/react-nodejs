const mongoose = require("mongoose")
const { isEmail } = require("validator")
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [20, "First name cannot be more than 20 characters"],
      text: true,
      // first name admin olamaz
      validate: {
        validator: function (v) {
          return !v.includes("admin")
        },
        message: "First name cannot contain admin",
      },
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [20, "Last name cannot be more than 20 characters"],
      text: true,
      validate: {
        validator: function (v) {
          return !v.includes("admin")
        },
        message: "Last name cannot contain admin",
      },
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxlength: [20, "Username cannot be more than 20 characters"],
      text: true,
      unique: true,
      validate: {
        validator: function (v) {
          return !v.includes("admin")
        },
        message: "Username cannot contain admin",
        error: "Username cannot contain admin",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxlength: [50, "Email cannot be more than 50 characters"],
      text: true,
      unique: true,
      validate: {
        validator: function (v) {
          if (!isEmail(v)) {
            return false
          }

          if (v.includes("admin")) {
            return false
          }

          return true
        },
        message: "Email is not valid",
        error: "Email is not valid",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password cannot be less than 5 characters"],
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      required: [true, "Gender is required"],
    },
    bYear: {
      type: Number,
      required: [true, "Birth year is required"],
      trim: true,
    },
    bMonth: {
      type: Number,
      required: [true, "Birth month is required"],
      trim: true,
    },
    bDay: {
      type: Number,
      required: [true, "Birth day is required"],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
      },
      instagram: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
