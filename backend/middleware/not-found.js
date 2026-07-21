const notFound = (req, res) => res.status(404).send("Page don't exist.")

module.exports = notFound
