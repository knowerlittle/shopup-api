module.exports = {
    database: process.env.MONGODB_URI || "mongodb://localhost:27017/hobbyist",
    url: (process.env.NODE_ENV === 'development' ? 'http://192.168.0.11:3000' : 'http://api.popin.space'),
}