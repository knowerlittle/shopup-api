const errorResponse = (err) => ({ 
  message: `Something went wrong. ${err}`
});

module.exports = errorResponse;