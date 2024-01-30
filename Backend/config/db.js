const mongoose = require('mongoose')

const connectDB = async () => {
    // const conn = await mongoose.connect("mongodb+srv://zenpai:6ixtoronto@cluster0.wntryw6.mongodb.net/?retryWrites=true&w=majority", {
    //     useNewUrlParser: true, 
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     useUnifiedTopology: true 
    // }); 
    const conn = await mongoose.connect( "mongodb://localhost/zenpai" , {
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    });

    console.log(`MongoDB connected: ${conn.connection.host}`)
}


module.exports = connectDB;








