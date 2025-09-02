import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    flightDate:{
        type:Date,
        required:true
    },
    station:{
        type:String,
        required:true
    }
})

const Passenger = mongoose.model('passenger',passengerSchema);
export default Passenger;