const mongoose = require("mongoose")

const url = process.env.URI || "mongodb+srv://raudazurak:M0123goU@cluster0.fikhzmf.mongodb.net/"

async function main(){
    mongoose.connect(url);

    const mgDB = mongoose.connection;

    mgDB.on('connected', console.log.bind(console, 'MongoDB & Mongoose Connected'));
}



module.exports=main