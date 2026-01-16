const PageNotFoundError = (req, res) => {
    res.status(404).json({ error: 'Page Not Found' });
}

module.exports = { PageNotFoundError };