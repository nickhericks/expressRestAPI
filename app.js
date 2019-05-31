const express = require('express');
const app = express();








// get method takes two arguments
// first is the route we want to handle (when client requests)
// second is callback function to run when request comes in
app.get('/greetings', (req, res) => {
	// Usually we respond with a template using res.render
	// instead we want to send back json so we use res.json
	res.json({greeting: 'Hello world!'});
});

// Send a GET request to READ(view) a list of quotes
app.get('/quotes', (req, res) => {
	res.json( data );
});

// Send a GET request to READ(view) a quote
app.get('/quotes/:id', (req, res) => {
	res.json(data);
});

// Send a POST request to CREATE a new quote


// Send a PUT request to UPDATE a quote


// Send a DELETE request to DELETE a quote


// Send a GET request to READ(view) a random quote




app.listen(3000, () => console.log('Quote API listening on port 3000!'));


const data = {
	quotes: [
		{
			id: 8721,
			quote:
        'We must accept finite disappointment, but we must never lose infinite hope.',
			author: 'Martin Luther King'
		},
		{
			id: 5779,
			quote:
        'Use what you’ve been through as fuel, believe in yourself and be unstoppable!',
			author: 'Yvonne Pierre'
		},
		{
			id: 3406,
			quote:
        'To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.',
			author: 'Barbara DeAngelis'
		}
	]
};