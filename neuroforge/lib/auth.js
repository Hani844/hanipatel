const jwt = require('jsonwebtoken');

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function getTokenFromRequest(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    throw new Error('Authorization header must be Bearer token');
  }
  return auth.replace('Bearer ', '');
}

function requireAuth(req) {
  const token = getTokenFromRequest(req);
  const decoded = verifyToken(token);
  return { id: decoded.sub, email: decoded.email };
}

module.exports = {
  signToken,
  verifyToken,
  getTokenFromRequest,
  requireAuth
};
