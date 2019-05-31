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


// Send a GET request to READ(view) a quote


// Send a POST request to CREATE a new quote


// Send a PUT request to UPDATE a quote


// Send a DELETE request to DELETE a quote


// Send a GET request to READ(view) a random quote




app.listen(3000, () => console.log('Quote API listening on port 3000!'));
