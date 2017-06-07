/**
 * Created by Desyon on 03.06.2017.
 */

const jwt = require('jsonwebtoken');

const privateKey = '3O4n\\!cX?a[+wQ%`u4gz&j#5cvT\\>avRsAJ{Gn$B.1Piml]C,eyyt);C:OoQkg/';

const issuer = 'calendarServer';
const subject = 'authentication';
const audience = 'serverServices';

module.exports.sign = function (username) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 3600,
    sub: subject,
    iss: issuer,
    aud: audience,
    user: username,
  },
  privateKey);
};

module.exports.verify = function (token, ret) {
  jwt.verify(token, privateKey, {
    aud: audience,
    iss: issuer,
    sub: subject,
  }, function (err, decoded) {
    ret(err, decoded);
  });
};
