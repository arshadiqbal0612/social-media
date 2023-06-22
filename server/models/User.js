const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      // select false means find api kai andar pass ko bhejo mat
      select: false,
      validate: {
        validator: function (password) {
          // Password must contain at least one special character
          const regex = /[!@#$%^&*(),.?":{}|<>]/;
          return regex.test(password);
        },
        message: "Password must contain at least one special character",
      },
    },

    name: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
    },

    avatar: {
      publicId: String,
      url: String,
    },

    followers: [
      {
        // jo log aapko foolow karege
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    followings: [
      {
        // jis log ko aap follow karege
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
