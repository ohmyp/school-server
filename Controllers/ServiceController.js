const fetchDB = require('../Handlers/DataBaseHandler')

class serviceController{
  async isAvailable(req, res, next){
    try {
      const query = await fetchDB(`select * from status;`)
      res.send(query)
  } catch (e) {
      console.log(e)
      res.send(e)
  }
  }
}
module.exports = new serviceController()