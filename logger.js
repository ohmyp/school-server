const { Console } = require("console");
const fs = require("fs");

const commonLogger = new Console({
  stdout: fs.createWriteStream("Logs/service.txt", {flags: 'a'}),
  stderr: fs.createWriteStream("Logs/serviceErrors.txt", {flags: 'a'}),
});
const adminLogger = new Console({
  stdout: fs.createWriteStream("Logs/admin.txt", {flags: 'a'}),
  stderr: fs.createWriteStream("Logs/adminErrors.txt", {flags: 'a'}),
});
const userLogger = new Console({
  stdout: fs.createWriteStream("Logs/user.txt", {flags: 'a'}),
  stderr: fs.createWriteStream("Logs/userErrors.txt", {flags: 'a'}),
});

class logger {
  log(req){
    commonLogger.log(Date() + '\n' + req.headers['user-agent'] + '\n' + req.originalUrl + '\n')
  }
  error(e){
    commonLogger.error(Date() + '\n' + e + '\n');
  }
  admin(req){
    adminLogger.log(Date() + '\n' + req.headers['user-agent'] + '\n' + req.originalUrl + '\n')
  }
  adminError(e){
    adminLogger.error(Date() + '\n' + e + '\n')
  }
  user(req){
    userLogger.log(Date() + '\n' + req.headers['user-agent'] + '\n' + req.originalUrl + '\n')
  }
  userError(e){
    userLogger.error(Date() + '\n' + e + '\n')
  }
}

module.exports = new logger()
