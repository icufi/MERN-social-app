const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // unique speeds up the query time, good for things like emails that need to be found quickly during login.
  password: { type: String, required: true, minLength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
});

userSchema.plugin(uniqueValidator); // stops us from making duplicate users with the same email address.

module.exports = mongoose.model('User', userSchema);