var LoginForm = React.createClass({
  getInitialState: function() {
    return {email: '', password: ''};
  },

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

  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
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
        <div className="form-group">
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="Your email address"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Your password"
            value={this.state.password}
            minLength={this.passwordMinLength}
            onChange={this.handlePasswordChange}
          />
        </div>
        <input
          className="btn btn-primary"
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
