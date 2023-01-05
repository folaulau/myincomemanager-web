import React from 'react';
import { useNavigate } from "react-router-dom";
import PublicHeader from "../../layout/header_public";
import PublicFooter from "../../layout/footer_public";
import { useState , useEffect} from "react";
import FirebaseApi from "../../api/FirebaseApi";
import UserApi from "../../api/UserApi";
import Auth from "../../components/auth/auth";
import './signin.css';

function SignIn() {

  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "Test1234!"
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // signUpWithEmailAndPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithEmailAndPassword = () => {
      console.log(userInfo)
      
      if(!validate(userInfo)){
        return;
      }

      FirebaseApi.signInWithEmail(userInfo.email, userInfo.password)
      .then((userCredential: any) => {
  
        console.log("userCredential", userCredential);

        userCredential.user.getIdToken()
        .then((token: string)=>{
          let authentication = {
            "token": token
          };

          UserApi.authenticate(authentication).then((response) => {
            console.log("response: ", response);

            let authData = response.data;

            Auth.signIn(authData);

            findNextDestination(authData.signUpStatus)

          }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error.message)
          });
        });

      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  };

  const findNextDestination = (signUpStatus: string) => {

    if(signUpStatus==='SIGN_UP'){
      navigate("/signup/profile");
    }else if(signUpStatus==='PROFILE'){
      navigate("/signup/income");
    }else if(signUpStatus==='INCOME'){
      navigate("/signup/goals");
    }else if(signUpStatus==='GOAL'){
      navigate("/signup/expenses");
    }else if(signUpStatus==='EXPENSE'){
      navigate("/dashboard");
    }else {
      navigate("/dashboard");
    }

  }

  const validate = (userInfo: any) => {

    if(!validateEmail(userInfo.email)){
      setErrorMsg("Email is invalid")
      return false;
    }

    return true;
  }

  const validateEmail = (email: string) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {
      return true;
    }

    return false;
  }

  return (
    <>
      <PublicHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
          <h1>Sign In</h1>
          
          {errorMsg && 
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              </div>
            </div>
          }

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Email Address</label>
              <input 
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={userInfo.email}
              onChange={handleInputChange}
              required
              className="form-control" 
              placeholder="johndoe@gmail.com"/>
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="mb-3">
              <label  className="form-label">Password</label>
              <input
              id="password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={handleInputChange}
              required
              className="form-control"
              />
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <div className="d-grid gap-2">
              <button onClick={()=>signInWithEmailAndPassword()} type="button" className="btn btn-primary">Sign In</button>
            </div>
            </div>
          </div>

          </div>
        </div>
      </div>
      <PublicFooter />
    </>
  );
}

export default SignIn;
