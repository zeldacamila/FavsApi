const { model, Schema } = require('mongoose')

//const passRegexp = new RegExp('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      //match: [passRegexp, 'The password must be at least 8-16 characters long, with at least one digit, one lowercase, one uppercase, and one non-alphanumeric character.']
    },
    favslists: {
      type: [{ type: Schema.Types.ObjectId, ref: 'FavsList' }],
      required: false
    }
  }, 
  { 
    timestamps: true,
    versionKey: false
  }
)

const User = model('User', userSchema)

module.exports = User
