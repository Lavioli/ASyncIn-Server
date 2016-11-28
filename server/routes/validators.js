/*exports.validatePlaylist = function(body) {
  if (!body.text) {
    return {
      error: true,
      status: 422,
      body: { message: 'Missing field: text' }
    };
  }

  if (typeof body.text !== 'string') {
    return {
      error: true,
      status: 422,
      body: { message: 'Incorrect field type: text' }
    };
  }

  if (!body.to || typeof body.to !== 'string') {
    return {
      error: true,
      status: 422,
      body: { message: 'Incorrect field type: to' }
    };
  }

  return { error: false };
};*/

exports.validateUser = function(body) {
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