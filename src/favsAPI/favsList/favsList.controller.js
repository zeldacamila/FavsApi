const FavsListModel = require('./favsList.model')

module.exports = {

  //GET 
  async show(req, res) {
    try {
      const favsLists = await FavsListModel.find()
      res.status(200).json({ message: 'Favs Lists founded', data: favsLists})
    } catch(err) {
      res.status(400).json({ message: 'Favs Lists not founded', data: err})
    }
  },

  //POST
  async create(req, res) {
    try{
      const data = req.body
      const newFavsList = await FavsListModel.create(data)
      res.status(201).json({ message: 'Favslist created', data: newFavsList})
    } catch(err) {
      res.status(400).json({ message: 'Favslist could not be created', data: err})
    }
  },

  //GET:id
  async list(req, res) {
    try {
      const { favsListId } = req.params

      const favsList = await FavsListModel.findById(favsListId)
      res.status(200).json({ message: 'Favs List founded', data: favsList})
    } catch(err) {
      res.status(404).json({ message: 'Favs List does not exist', data: err})
    }
  },

  //DELETE:id
  async destroy(req, res){
    try {
      const { favsListId } = req.params

      const favsList = await FavsListModel.findByIdAndDelete(favsListId)
      res.status(200).json({ message: 'Favs List deleted', data: favsList})
    } catch(err) {
      res.status(404).json({ message: 'Favs List does not exist', data: err})
    }
  }

}