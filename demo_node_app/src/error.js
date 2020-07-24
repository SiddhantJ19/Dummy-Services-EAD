class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
};

const handleError = (err) => {
  const {statusCode, message} = err;
  console.error(statusCode, message);
  console.error(err);
  if (statusCode >= 500) {
    return 'Internal Server Error';
  }
  return message;
};

module.exports = {
  ErrorHandler,
  handleError
};