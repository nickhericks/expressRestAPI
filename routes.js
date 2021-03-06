const express = require('express');
const router = express.Router();
const records = require("./records");

// Helper function so that we don't need to add try/catch to every route
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}


// ****************************************
// Routes
// ****************************************

// Send a GET request to /quotes to READ(view) a list of quotes
// Express .get method takes two arguments
// first arg is the route we want to handle (when client requests)
// second arg is callback function to run when request comes in
router.get('/quotes', async (req, res) => {
	const quotes = await records.getQuotes();
	// Usually we respond with a template using res.render
	// instead we want to send back json so we use res.json
	res.json(quotes);
});


// Send a GET request to /quotes/:id to READ(view) a quote
router.get('/quotes/:id', asyncHandler( async (req, res) => {
		// throw new Error('Oh noooooooo!');
		const quote = await records.getQuote(req.params.id);
		if(quote) {
  		res.json(quote);
		} else {
			res.status(404).json({message: 'Quote not found.'});
		}
}));


// Send a GET request to /quotes/quote/random to READ(view) a random quote
router.get('/quotes/quote/random', asyncHandler( async (req, res, next) => {
	const quote = await records.getRandomQuote();
	res.json(quote);
}));


// Send a POST request to /quotes to CREATE a new quote
router.post("/quotes", asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	if(req.body.author && req.body.quote) {
		const quote = await records.createQuote({
			quote: req.body.quote,
			author: req.body.author
		});
		res.status(201).json(quote);
	} else {
		res.status(400).json({message: 'Quote and author required.'});
	}  
}));


// Send a PUT request to /quotes/:id to UPDATE a quote
router.put('/quotes/:id', asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	const quote = await records.getQuote(req.params.id);
	if(quote) {
		quote.quote = req.body.quote;
		quote.author = req.body.author;
		await records.updateQuote(quote);
		// We don't send anything back with PUT requests,
		// so we use Express .end() method to tell it we're done.
		res.status(204).end();
	} else {
		res.status(404).json({ message: "Quote not found." });
	}
}));


// Send a DELETE request to /quotes/:id to DELETE a quote
router.delete("/quotes/:id", asyncHandler( async (req, res, next) => {
	// throw new Error('Oh noooooooo!');
	const quote = await records.getQuote(req.params.id);
	if (quote) {
		await records.deleteQuote(quote);
		res.status(204).end();
	} else {
		res.status(404).json({ message: "Quote not found." });
	}
}));


module.exports = router;