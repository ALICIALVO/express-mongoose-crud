import log from '@ajar/marker';
const { White, Reset, Red } = log.constants;
const { NODE_ENV } = process.env;

export const error_handler = (err, req, res, next) => {
    log.error(err);
    // validation errors first provide more specific response to the client: before handle other types of errors, such as internal server errors:
    if (err.name === 'ValidationError') {
        // validation error handling:
        res.status(400).json({ error: err.message });
    } else {
        // handle other errors based on environment:
        if (NODE_ENV === 'development') {
            // development environment error handling:
            res.status(500).json({ status: err.message, stack: err.stack });
        } else {
            // production environment error handling:
            res.status(500).json({ status: 'internal server error...' });
        }
    }
};

export const not_found = (req, res) => {
    log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    res.status(404).json({ status: `url: ${req.url} not found...` });
};


// validation error example from postman:
// post req:
// {
//     "first_name": "",
//     "last_name": "",
//     "email": "invalid-email"
// }

// res:
// {
//     "error": "\"first_name\" is not allowed to be empty. \"last_name\" is not allowed to be empty. \"email\" must be a valid email"
// }
