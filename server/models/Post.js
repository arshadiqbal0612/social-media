const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  //evry post have owner which type is userid

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  image: {
    publicId: String,
    url: String,
  },

  caption: {
    type: String, 
    required: true,
  },

  likes: [
    {
      // jitna like utna user ud yaha aa jaygi
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],

 
},{

  timestamps:true
});

module.exports = mongoose.model("post", postSchema);
