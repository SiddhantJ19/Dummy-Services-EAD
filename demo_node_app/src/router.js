const Router = require('express').Router
const {ErrorHandler} = require('./error');
const router = new Router();

// 404
router.get('/pageDoesNotExist', (req, res) => {
  throw new ErrorHandler(404, 'The queried resource does not exist');
});

// 400
router.post('/badRequest', (req, res) => {
  const body = JSON.stringify(req.body);

  //  logging request data but not sending to user
  console.log("Bad Request with body: " , body)
  
  throw new ErrorHandler(400, 'Bad Request ' );
});


// 500
router.get('/serverFaliure', (req, res) => {
  // trying to run undefined function
  try {
    thisWillFail();
  } catch (error) {
    // Client won't see any server logs
    throw new ErrorHandler(500, error.message);
  }
}); 


module.exports = router;