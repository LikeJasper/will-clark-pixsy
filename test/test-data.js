module.exports = {
  VALID_EMAIL_AND_VALID_PASSWORD: {email: 'ansel@adams.com', password: 'Yosemite'},
  VALID_EMAIL_AND_INVALID_PASSWORDS: [
    {email: 'ansel@adams.com', password: ''},
    {email: 'ansel@adams.com', password: 'yosemite'},
    {email: 'ansel@adams.com', password: 'YOSEMITE'},
    {email: 'ansel@adams.com', password: 'punk65'},
    {email: 'ansel@adams.com'}
  ],
  INVALID_EMAILS: [
    {email: 'ansel@adams.co.uk', password: 'password'},
    {email: 'ansel@adams.co.uk', password: ''},
    {email: 'ansel@adams.co.uk', password: 'Yosemite'},
    {email: '', password: 'Yosemite'},
    {password: 'Yosemite'},
    {}
  ],

  HTML_SNIPPET: "<title>Will Clark / Pixsy Test Dive</title>",

  VALID_EMAIL_AND_VALID_PASSWORD_RESPONSE: {data: 'success'},
  INVALID_EMAIL_RESPONSE: {error: 'Email not found.'},
  INVALID_PASSWORD_RESPONSE: {error: 'Incorrect password.'}
};
