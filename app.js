const express = require('express');
const app = express();
const routes = require('./routes');



// Middleware that tells express incoming data should be read as json
// and also that it should be made available in the req.body
app.use(express.json());

// When a request starts with path /api,
// then use the routes inside the routes.js file
app.use('/api', routes);

// get method takes two arguments
// first is the route we want to handle (when client requests)
// second is callback function to run when request comes in
app.get('/greetings', (req, res) => {
	// Usually we respond with a template using res.render
	// instead we want to send back json so we use res.json
	res.json({greeting: 'Hello world!'});
});





app.use((req, res, next) => {
	const err = new Error('Not Found.');
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});




app.listen(3000, () => console.log('Quote API listening on port 3000!'));