import { useEffect, useReducer, useRef, useState } from "react";
import "../styles/Authentication.css";
import { io, Socket } from "socket.io-client";
import arrowImg from "../assets/arrow-right-square-fill.svg";
import arrowDownUp from "../assets/arrow-down-up.svg";
// import { useHistory } from 'react-router-dom';
import Group6 from "../assets/Group 8.svg";
import Group7 from "../assets/Group 7.svg";
import { useNavigate } from "react-router-dom";

interface Values {
  username: string;
  password: string;
  email: string;
}

type Action =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_EMAIL"; payload: string };

const reducer = (state: Values, action: Action): Values => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

function Authentication() {
  const [userData, setUserData] = useReducer(reducer, {
    username: "",
    password: "",
    email: "",
  });
  const [loginData, setLoginData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
 
  //to switch between login and signup
  const [switcher, setSwitcher] = useState<string>("signup");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const vals = switcher ==="signup"?{ ...userData,switcher }:{...loginData,switcher} ;
      const response = await fetch(`http://localhost:5000/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      });
    const data = await response.json();
  if  (data.message === "Signup successful" || data.message === "Login successful"){
    navigate("/home")
  }
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [usernameImg, setUsernameImg] = useState(Group6);
  const [passwordImg, setPasswordImg] = useState(Group6);
  const [emailImg, setEmailImg] = useState(Group6);
  const authoNamepsace = useRef<Socket | null>(null);
const navigate = useNavigate();
  // const usernameRef = useRef<HTMLInputElement | null>(null);
  // const passwordRef = useRef<HTMLInputElement | null>(null);
  // const emailRef = useRef<HTMLInputElement | null>(null);
  // const [borderImage,setborderImg] = useState(Group6);
  useEffect(() => {
    const endpoint = switcher === "signup" ? "signup" : "login";
  
        authoNamepsace.current = io(`http://localhost:5000/${endpoint}`);
    authoNamepsace.current.on("connect", () => {
      console.log("ehllllljadkfadjfjas");
    });
    return () => {
      authoNamepsace.current?.removeAllListeners();
      authoNamepsace.current?.disconnect();
    };
  }, [ switcher]);
  //
  //
  //SING IN VALIDATORS
  useEffect(() => {
    if (!userData.username) return;

    authoNamepsace.current?.emit("check-username", userData.username);

    authoNamepsace.current?.on("username-availability-and-lenght", (arg) => {
      setUsernameImg(arg ? Group7 : Group6);
    });
    return () => {
      authoNamepsace.current?.off("username-availability-and-lenght");
    };
  }, [userData.username]);

  useEffect(() => {
    if (!userData.password) return;
    setPasswordImg(userData.password.length < 8 ? Group7 : Group6);
  }, [userData.password]);

  useEffect(() => {
    if (!userData.email) return;
    authoNamepsace.current?.emit("check-email", userData.email);
    authoNamepsace.current?.on("invalid-email", (arg) => {
      setEmailImg(arg ? Group7 : Group6);
    });
    return () => {
      authoNamepsace.current?.off("invalid-email");
    };
  }, [userData.email]);

  //
  //
  //
  //
  //LOIGN IN VALIDATORS
  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
  };
  //   authoNamepsace.current?.emit("check-username", loginData.username);
  //   console.log("logginin");
  //   authoNamepsace.current?.once("username-availability", async (arg) => {
  //     if (arg) {
  //       try {
  //         // const response = await fetch("http:/localhost/5000/signup", {
  //         //   method: "GET",
  //         //   headers: { "Content-Type": "application/json" },
  //         //   body: JSON.stringify(loginData),
  //         // });
  //         const response = await fetch("http:/localhost/5000/signup")
  //         // if (response.ok) {
  //         //   const data = await response.json();
  //         //   console.log("Login successful:", data);
  //         // } else {
  //         //   const errorData = await response.json();
  //         //   console.error("Login failed:", errorData);
  //         // }
  //       } catch (er) {
  //         alert("error while logining in");
  //         console.log(er);
  //       }
  //     }
  //   });
  //   // fetch("http://localhost:5000/login")
  // };
  const [LoginusernameImg, setLoginUsenameImg] = useState(Group6);
  const [LoginpasswordImg, setLoginPasswordImg] = useState(Group6);
  useEffect(() => {
    if (!authoNamepsace) return;
    authoNamepsace.current?.emit("check-username");
  }, [loginData.username]);

  return (
    <>
      <div className="athentication">
        <h1 className="text">
          {switcher === "signup" ? "Sign up" : "Log In"}{" "}
        </h1>
        <div className="switcher">
          <button
            className="switcher-btn"
            onClick={() =>
              setSwitcher((prev) => (prev === "login" ? "signup" : "login"))
              // setSwitcher((prev) => (prev === "login" ? "signup" : "signup"))
            }
          >
            {/* <img src={arrowDownUp} alt="" /> */}
            {switcher === 'login'?'Sign up':"Log in"}
          </button>
        </div>
        <div className="auth-container">
          {switcher === "signup" && (
            <form id="signup" onSubmit={handleSignUp} className="form">
              <div className="each-data">
                <label htmlFor="username" className="input-name">
                  Username
                </label>
                <img src={usernameImg} alt="" />
                <input
                  name="username"
                  type="text"
                  id="username"
                  className="input"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({
                      type: "SET_USERNAME",
                      payload: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="each-data">
                <label htmlFor="password" className="input-name">
                  Password
                </label>
                <img src={passwordImg} alt="" />
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="input"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({
                      type: "SET_PASSWORD",
                      payload: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="each-data">
                <label htmlFor="email" className="input-name">
                  Email
                </label>
                <img src={emailImg} alt="" />
                <input
                  name="email"
                  type="email"
                  id="email"
                  className="input"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ type: "SET_EMAIL", payload: e.target.value })
                  }
                  required
                />
              </div>
            </form>
          )}
          {switcher === "login" && (
            <form id="login" onSubmit={handleSignUp} className="form">
              <div className="each-data">
                <label htmlFor="username" className="input-name">
                  Username
                </label>
                <img src={LoginusernameImg} alt="" />
                <input
                  name="username"
                  type="text"
                  id="username"
                  className="input"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                  /// <reference path="" />
                />
              </div>
              <div className="each-data">
                <label htmlFor="password" className="input-name">
                  Password
                </label>
                <img src={LoginpasswordImg} alt="" />
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="input"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </form>
          )}
        </div>
        <div className="signup-btn-container">
          <div className="sosl">
            <h5 className="hid">Sing up</h5>
            <button form={switcher} type="submit" className="signup-btn">
              <img src={arrowImg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
