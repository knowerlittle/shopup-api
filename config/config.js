module.exports = {
    database: process.env.MONGODB_URI || "mongodb://localhost:27017/popin",
    url: (process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://api.popin.space'),
}