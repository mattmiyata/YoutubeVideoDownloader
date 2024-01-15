//catchAsync

module.exports = (fn) => {
  //returns annonymous function with parameters passed into it
  return (req, res, next) => {
    fn(req, res, next).catch(next); // next function passes error to global error middleware
  };
};
