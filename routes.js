const express = require('express');
const router = express.Router();



function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}




// Send a GET request to /quotes to READ(view) a list of quotes
router.get('/quotes', async (req, res) => {
	const quotes = await records.getQuotes();
	res.json(quotes);
});

// Send a GET request to /quotes/:id to READ(view) a quote
router.get('/quotes/:id', async (req, res) => {
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
router.delete("/quotes/:id", async (req, res, next) => {
  try {
    throw new Error('Oh noooooooo!');
    const quote = await records.getQuote(req.params.id);
    if (quote) {
      await records.deleteQuote(quote);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Quote not found." });
    }
  } catch (err) {
    next(err);
  }
});

// Send a GET request to /quotes/quote/random to READ(view) a random quote
// router.get();



module.exports = router;