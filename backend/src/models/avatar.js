import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating User schema, sort of like working with an ORM
const AvatarSchema = new Schema({
  Uid: {
    type: String
  },
  Class: {
    type: String
  }
})
// Creating a table within database with the defined schema
const Avatar = mongoose.model('avatars', AvatarSchema)
// Exporting table for querying and mutating
export default Avatar;
