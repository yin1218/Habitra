import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating User schema, sort of like working with an ORM
const IconSchema = new Schema({
  Uid: {
    type: String
  },
  Class: {
    type: String
  }
})
// Creating a table within database with the defined schema
const Icon = mongoose.model('icons', IconSchema)
// Exporting table for querying and mutating
export default Icon;
