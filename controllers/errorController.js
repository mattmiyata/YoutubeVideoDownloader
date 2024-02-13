const sendErrorDev = (err, res) => {
  res
    .render('404', {
      message: err.message,
    })
    .status(err.statusCode)
    .json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.render('404', {
      message: 'Something went wrong!',
    });
    // .status(err.statusCode)
    // .json({
    //   status: err.status,
    //   message: err.message,
    // });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('Error', err);

    // 2) Send generic message

    res.render('404', {
      message: 'We cannot find that video!',
    });
    // .status(500);
    // .json({
    //   status: 'error',
    //   message: 'Something went very wrong!',
    // });
  }
};

module.exports = (err, req, res, next) => {
  // Express knows error middleware because of 4 parameters set
  err.statusCode = err.statusCode || 500; // read status code on object
  // if not defined '500' default
  err.status = err.status || 'error';

  currentMode = process.env.NODE_ENV; //NODE_ENV resulting string seems to have spaces before or after so using 'includes' instead of === ... Will fix at a later date

  if (currentMode.includes('development')) {
    sendErrorDev(err, res);
  } else if (currentMode.includes('production')) {
    sendErrorProd(err, res);
  }
};
