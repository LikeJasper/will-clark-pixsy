var LoginForm = React.createClass({
  render: function() {
    return (
      <form className="login-form">
        <input
          type="email"
          placeholder="Your email address"
        />
        <input
          type="password"
          placeholder="Your password"
          minlength="6"
          novalidate="true"
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
