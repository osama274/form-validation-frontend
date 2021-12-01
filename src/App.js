/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";
import { useEffect, useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState([]);
  const [password2, setPassword2] = useState([]);
  const [payload, setPayload] = useState({});
  const [passwordsInputType, setPasswordsInputType] = useState("password");

  const [userNameIsValid, setUserNameIsValid] = useState(false);
  const [password1IsValid, setPassword1IsValid] = useState(false);
  const [password2IsValid, setPassword2IsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const clearPayload = () => {
    if (Object.keys(payload).length !== 0) {
      setPayload((prev) => ({}));
    }
  };

  useEffect(() => {
    clearPayload();
  }, [userName, email, password1, password2]);

  useEffect(() => {
    setFormIsValid(
      userNameIsValid &&
        emailIsValid &&
        password1IsValid &&
        password2IsValid &&
        password1 === password2
    );
  }, [userNameIsValid, emailIsValid, password1IsValid, password2IsValid]);

  const handleUserName = (e) => {
    let _userName = e.target.value;
    _userName.length >= 5 && _userName.length <= 20
      ? setUserNameIsValid(true)
      : setUserNameIsValid(false);
    setUserName(_userName);
  };

  const handleEmail = (e) => {
    let _email = e.target.value;
    _email && /[a-zA-z0-9_.-]{2,}@[a-z]{2,}\.[a-z]{2,}/.test(_email)
      ? setEmailIsValid(true)
      : setEmailIsValid(false);
    setEmail(_email);
  };

  const handlePassword1 = (e) => {
    let _password1 = e.target.value;
    _password1.length >= 8
      ? setPassword1IsValid(true)
      : setPassword1IsValid(false);
    setPassword1(_password1);
  };

  const handlePassword2 = (e) => {
    let _password2 = e.target.value;
    _password2.length >= 8
      ? setPassword2IsValid(true)
      : setPassword2IsValid(false);
    setPassword2(_password2);
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === "password" ? "text" : "password"
    );
  };

  const handleButton = (e) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      userName,
      email,
      password1,
      password2,
    }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        email,
        password1,
        password2,
      }),
    };
    (async () => {
      await fetch(`http://localhost:3033/create`, requestOptions);
    })();
  };

  return (
    <div className="App">
      <form>
        <fieldset>
          <legend>Sign up</legend>
          <div className={`row ${userNameIsValid ? "valid" : "invalid"}`}>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={handleUserName}
            />
          </div>
          <div className={`note ${userNameIsValid ? "valid" : "invalid"}`}>
            <p>allowed: 5 - 20 characters</p>
          </div>
          <div className={`row ${emailIsValid ? "valid" : "invalid"}`}>
            <label htmlFor="text">Email</label>
            <input
              type="email"
              id="name"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className={`note ${emailIsValid ? "valid" : "invalid"}`}>
            <p>e.g. user-name@mail.com</p>
          </div>
          <div className="buttonRow">
            <button type="button" onClick={handleShowPasswordButton}>Show Password</button>
          </div>
          <div className={`row ${password1IsValid ? "valid" : "invalid"}`}>
            <label htmlFor="password">Password</label>
            <input
              type={passwordsInputType}
              id="name"
              value={password1}
              onChange={handlePassword1}
            />
          </div>
          <div className={`note ${password1IsValid ? "valid" : "invalid"}`}>
            <p>min 8 characters</p>
          </div>
          <div className={`row ${password2IsValid ? "valid" : "invalid"}`}>
            <label htmlFor="password">Password</label>
            <input
              type={passwordsInputType}
              id="name"
              value={password2}
              onChange={handlePassword2}
            />
          </div>
          <div className={`note ${password2IsValid ? "valid" : "invalid"}`}>
            <p>repeat your password</p>
          </div>
          <div className="buttonRow">
            <button disabled={!formIsValid} onClick={handleButton}>
              Register
            </button>
          </div>
        </fieldset>
      </form>

      {Object.keys(payload).length !== 0 && (
        <pre>payload: {JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
