import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating User schema, sort of like working with an ORM
const UserSchema = new Schema({
  User_ID: {
    type: String,
    unique: true,
    required: [true, 'User_ID field is required and should be unique.']
  },
  Name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  Email: {
    type: String,
    required: [true, 'Email field is required.']
  },
  Password: {
    type: String,
    required: [true, 'Password field is required.']
  },
  Avatar: {
    type: String,
    required: [true, 'Avatar field is required.']
  },
  Token: {
    type: String
  }
})
// Creating a table within database with the defined schema
const User = mongoose.model('users', UserSchema)
// Exporting table for querying and mutating
export default User;
