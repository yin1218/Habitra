import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating User schema, sort of like working with an ORM
const ParticipationSchema = new Schema({
  Task_ID: {
    type: String,
    required: [true, 'User_ID field is required and should be unique.']
  },
  User_ID: {
    type: String,
    required: [true, 'User_ID field is required and should be unique.']
  },
  Is_Admin: {
    type: Boolean
  },
  Is_Quit: {
    type: Boolean
  },
  Quit_Time: {
    type: Date
  },
  Punish_Sum: {
    type: Number
  },
  Last_Calculate_Day: {
    type: Date
  }
})
// Creating a table within database with the defined schema
const Participation = mongoose.model('participations', ParticipationSchema)
// Exporting table for querying and mutating
export default Participation;
