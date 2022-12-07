import hide from '../../imgs/hide.png';
import showp from '../../imgs/show.png';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultContext } from "../../../Context";
import { login, profile } from "../../../actions/user";
import { checkEmail } from '../../../actions/user';

export const Signin = () => {

  const navigate =  useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [pmessage, setPmessage] = useState("");
  const [check, setCheck] = useState('')
  const { user, email, token, reboot, setUser, password, setEmail, setPassword, isValidEmail, handleSetIsAuth } = useContext(DefaultContext);

  const handleOnClick = async () => {
    setPmessage(password ? "" : "Enter your password!");
    await checkEmail(email).then(res => setCheck(res));
    if (isValidEmail() && check) {
      login(
        email,
        password,
        handleSetIsAuth
      ).then((response) => {
        if (response.data.message) {
          setPmessage(password ? response.data.message : pmessage);
        } else {
          profile(email, token).then(response => {
            setUser(response);
            localStorage.setItem('user', user);
            navigate('/');
          });
        }
      })
    }
  };

  return (
    <div className="reg">
      <h1>Sign in</h1>
      <form action="post">
        <div>
          <div className="field">
            <p>E-mail</p>
            <input
              type="email"
              value={email}
              maxLength={320}
              placeholder="example@mail.com"
              onBlur={async () => {
                await checkEmail(email).then(res => setCheck(res));
                setMessage(email
                  ? isValidEmail()
                    ? check
                      ? ""
                      : "User not found."
                    : "Enter a valid email, please!"
                  : "Enter your email!")}}
              onChange={(event) => setEmail(event.target.value.replace(/[^a-zA-Z0-9@._\s]/g, ""))}
              onKeyDown={(event) => {
                if (/[а-яё]+/i.test(event.key)) {
                  setMessage("Latin letters only.")
                  event.preventDefault();
                } else if (event.key === " ") {
                  event.preventDefault()
                }
              }}
            />
            <span className="warn">{message}</span>
          </div>
          <p>Password</p>
          <div className="password" style={{marginBottom: "5px"}}>
            <input
              type={show ? "text" : "password"}
              value={password}
              placeholder='Enter your password'
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (/[а-яё]+/i.test(event.key)) {
                    setPmessage("Latin letters only.")
                    event.preventDefault();
                }
              }}
            />
            <img onClick={() => setShow(!show)} src={show ? hide : showp}/>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "right",
            marginTop: "5px",
            marginBottom: "30px"}}
          >
            <div>
              <span className="warn">{pmessage}</span>
            </div>
            <a className="forgot">Forgot password?</a>
          </div>
        </div>
        <a
          className="button"
          onClick={() => handleOnClick()}
        >SIGN IN</a>
        <a onClick={() => {
          navigate("/reg")
          reboot();
        }} className="forgot dont">Don't have an account? <u><b>Sign up</b></u></a>
      </form>
    </div>
  );
};