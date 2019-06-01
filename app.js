const express = require('express');
const app = express();
const routes = require('./routes');


// Middleware that tells express incoming data should be read as json
// and also that it should be made available in the req.body
app.use(express.json());


// When a request starts with path /api,
// then use the routes inside the routes.js file
app.use('/api', routes);


// 404 error route
// Executed when no existing routes are requested
app.use((req, res, next) => {
	const err = new Error('Not Found.');
	next(err);
});

// Global error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});


app.listen(3000, () => console.log('Quote API listening on port 3000!'));