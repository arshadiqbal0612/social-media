const mongoose = require("mongoose");

module.exports = async () => {
  const mongourl ="mongodb+srv://arshu:V7yjpc4mRv5m7JX3@cluster0.viewbxo.mongodb.net/?retryWrites=true&w=majority";



  try {
 const connect= await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

   console.log(`mongodb connected: ${connect.connection.host}`);

  } catch (error) {
    console.log(error);
    process.exit( 1);
  } 
};
