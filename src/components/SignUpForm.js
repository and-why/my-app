import React, { Component } from "react";
import { auth } from "../firebase";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, passwordOne } = this.state;
    // console.log('works');

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.onRequestClose();
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  };

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || email === "";

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="modal__form--inputs">
            <h2>Sign Up For An Account</h2>

            <input
              value={email}
              type="text"
              onChange={e => this.setState(byPropKey("email", e.target.value))}
              placeholder="Email Address"
            />
            <input
              value={passwordOne}
              onChange={e =>
                this.setState(byPropKey("passwordOne", e.target.value))
              }
              type="password"
              placeholder="Choose Password"
            />
            <input
              value={passwordTwo}
              onChange={e =>
                this.setState(byPropKey("passwordTwo", e.target.value))
              }
              type="password"
              placeholder="Confirm Password"
            />
            {error && <p>{error.message}</p>}
          </div>
          <button
            disabled={isInvalid}
            type="submit"
            className="btn modal__button--accept"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const SignUpButton = props => (
  <button className="auth__button" onClick={props.openModalSignUp}>
    Sign Up
  </button>
);

export { SignUpForm, SignUpButton };
