class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // send error message to user only if opperational error

    Error.captureStackTrace(this, this.constructor); // when new error created and function called not added to stack trace
  }
}

module.exports = AppError;
