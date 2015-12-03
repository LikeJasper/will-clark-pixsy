var LoginForm = React.createClass({

  passwordMinLength: 6,
  validateEmail: function(email) {
    if (email[0] === '@' || email[email.length-1] === '@' || email.indexOf('@') === -1) {
      return false;
    }
    return true;
  },
  validatePassword: function(password) {
    if (password.length < this.passwordMinLength) {
      return false;
    }
    return true;
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var inputs = e.target.children;
    var email = inputs.email.value.trim();
    var password = inputs.password.value;
    var validEmail = this.validateEmail(email);
    var validPassword = this.validatePassword(password);

    if (validEmail && validPassword) {
      // TODO: Send to server
      console.log("Sending valid email and password to server...");
    } else {
      if (!validEmail) {
        // TODO: Display email validation help
        console.log("Displaying email validation help...");
      }
      if (!validPassword) {
        // TODO: Display password validation help
        console.log("Displaying password validation help...");
      }
    }
  },

  render: function() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Your email address"
        />
        <input
          name="password"
          type="password"
          placeholder="Your password"
          minLength={this.passwordMinLength}
        />
        <input
          type="submit"
          value="Log in"
          formNoValidate
        />
      </form>
    );
  }
});

ReactDOM.render(
  <LoginForm />,
  document.getElementById('content')
);
