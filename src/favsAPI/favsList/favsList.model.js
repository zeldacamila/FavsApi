const { Schema, model } = require('mongoose')

const favsListSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: [12, "favsList's name is too long"],
    },
    favs: {
      type: Array,
    }
  },
  {
    timestamps: true
  }
)

const FavsList = model('favslist', favsListSchema)

module.exports = FavsList