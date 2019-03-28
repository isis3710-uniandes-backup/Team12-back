const secretToken = 'keyboard cat 4 ever';
const jwtMW = exjwt({
  secret: secretToken
});
module.exports = jwtMW;
module.exports = secretToken;