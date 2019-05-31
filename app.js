const express = require('express');
const app = express();

const records = require('./records');

// Middleware that tells express incoming data should be read as json
// and also that it should be made available in the req.body
app.use(express.json());


// get method takes two arguments
// first is the route we want to handle (when client requests)
// second is callback function to run when request comes in
app.get('/greetings', (req, res) => {
	// Usually we respond with a template using res.render
	// instead we want to send back json so we use res.json
	res.json({greeting: 'Hello world!'});
});






// Send a GET request to /quotes to READ(view) a list of quotes
app.get('/quotes', async (req, res) => {
	const quotes = await records.getQuotes();
	res.json(quotes);
});

// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res) => {
	try {
		// throw new Error('Oh noooooooo!');
		const quote = await records.getQuote(req.params.id);
		if(quote) {
  		res.json(quote);
		} else {
			res.status(404).json({message: 'Quote not found.'});
		}
	} catch(err) {
		res.status(500).json({error: err.message});
	}
});

// Send a POST request to /quotes to CREATE a new quote
app.post("/quotes", async (req, res) => {
	try {
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
	} catch(err) {
		res.status(500).json({error: err.message});
	}
  
});

// Send a PUT request to /quotes/:id to UPDATE a quote
app.put('/quotes/:id', async (req, res) => {
	try {
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
	} catch(err) {
		res.status(500).json({ error: err.message });
	}
});

// Send a DELETE request to /quotes/:id to DELETE a quote
app.delete("/quotes/:id", async (req, res) => {
  try {
    // throw new Error('Oh noooooooo!');
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      await records.deleteQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Quote not found." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a GET request to /quotes/quote/random to READ(view) a random quote









app.use((req, res, next) => {
	const err = new Error('Not Found.');
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	
});




app.listen(3000, () => console.log('Quote API listening on port 3000!'));