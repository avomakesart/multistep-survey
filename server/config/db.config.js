module.exports = {
  HOST: 'localhost',
  USER: 'alvarocastle',
  PASSWORD: 'BLUEcat2518',
  DB: 'profencuesta',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
