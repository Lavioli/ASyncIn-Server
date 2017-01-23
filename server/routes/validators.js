
exports.validateUser = (body) => {
  if (!body.username) {
    return {
      error: true,
      status: 422,
      body: { message: 'Missing field: username' }
    };
  }

  if (typeof body.username !== 'string') {
    return {
      error: true,
      status: 422,
      body: { message: 'Incorrect field type: username' }
    };
  }

  if (!body.password) {
    return {
      error: true,
      status: 422,
      body: { message: 'Missing field: password' }
    };
  }

  if (typeof body.password !== 'string') {
    return {
      error: true,
      status: 422,
      body: { message: 'Incorrect field type: password' }
    };
  }

  return { error: false };
};