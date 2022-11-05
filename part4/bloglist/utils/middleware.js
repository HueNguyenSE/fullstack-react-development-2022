const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:',req.method)
    logger.info('Path:',req.path)
    logger.info('Body:',req.body)
    logger.info('---')
    next();
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

//handler of requests with unknown endpoint
const errorHandler = (err, req, res, next) => {
	console.log(err.message);

	if (err.name === 'CastError') {
		return res.status(400).sned({ error: 'malformated id' });
	}
	next(err);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}