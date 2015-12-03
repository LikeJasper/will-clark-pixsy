(function($) {

  var LoginForm = React.createClass({
    getInitialState: function() {
      return {
        email: '',
        password: '',
        emailValid: null,
        passwordValid: null
      };
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
      var email = e.target.value;
      var valid = this.validateEmail(email);

      this.setState({email: email, emailValid: valid});
    },
    handlePasswordChange: function(e) {
      var password = e.target.value;
      var valid = this.validatePassword(password);

      this.setState({password: password, passwordValid: valid});
    },
    handleSubmit: function(e) {
      e.preventDefault();

      if (this.state.emailValid && this.state.passwordValid) {
        var data = {email: this.state.email.trim(), password: this.state.password};
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: data,
          success: function(data) {
            console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(xhr);
            console.log(status, err);
          }.bind(this)
        });
      }
    },

    getGroupClassName: function(groupName) {
      var className = "form-group";
      var valid = groupName === 'email' ? this.state.emailValid : this.state.passwordValid;

      if (valid) {
        className += " has-success";
      } else if (valid === false) {
        className += " has-error";
      }

      return className;
    },

    render: function() {
      return (
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div id="email-group" className={this.getGroupClassName('email')}>
            <input
              className="form-control"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Your email address"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            {this.state.emailValid === false ? <span className="help-block">Please enter a valid email address.</span> : null}
          </div>
          <div id="password-group" className={this.getGroupClassName('password')}>
            <input
              className="form-control"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Your password"
              value={this.state.password}
              minLength={this.passwordMinLength}
              onChange={this.handlePasswordChange}
            />
            {this.state.passwordValid === false ? <span className="help-block">Your password must be at least 6 characters.</span> : null}
          </div>
          <input
            className="btn btn-primary center-block"
            type="submit"
            value="Log in"
            formNoValidate
          />
        </form>
      );
    }
  });

  ReactDOM.render(
    <LoginForm url="/login" />,
    document.getElementById('content')
  );

}(jQuery));
