import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import FirebaseApi from "../../api/FirebaseApi";
import UserApi from "../../api/UserApi";
import Auth from "../../components/auth/auth";

function Dashboard() {

  let navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "folaudev+"+Math.floor(Math.random() * 1000000000)+"@gmail.com",
    password: "Test1234!",
    confirmPassword: "Test1234!"
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

  const signUpWithEmailAndPassword = () => {
      console.log(userInfo)
      
      if(!validate(userInfo)){
        return;
      }

      FirebaseApi.signUpWithEmail(userInfo.email, userInfo.password)
      .then((userCredential) => {
  
        console.log("userCredential", userCredential);

        userCredential.user.getIdToken()
        .then((token)=>{
          let authentication = {
            "token": token
          };

          UserApi.authenticate(authentication)
          .then((response) => {
            console.log("response: ", response);

            Auth.signIn(response.data);

            navigate("/signup/profile");
            
          }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error.message)
          });
        });

      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const validate = (userInfo: any) => {

    if(!validateEmail(userInfo.email)){
      setErrorMsg("Email is invalid")
      return false;
    }

    if(userInfo.password!==userInfo.confirmPassword){
      setErrorMsg("Password and Confirm Password are not equal") 
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
      <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
            <h2>Dashboard</h2>
            
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
              <div className="col-sm-4 col-12">
                Life: $2300
              </div>
              <div className="col-sm-4 col-12">
                Status: used $1200, 45%
              </div>
            </div>
            <h4>Monthly Income</h4>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Anvilogic
                  </div>
                  <div className="col-sm-4 col-12">
                    $10000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Datappraise
                  </div>
                  <div className="col-sm-4 col-12">
                    $7000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Others
                  </div>
                  <div className="col-sm-4 col-12">
                    $2000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Total
                  </div>
                  <div className="col-sm-4 col-12">
                    $19000
                  </div>
                </div>
              </div>
            </div>
            <h4>Monthly Expenses</h4>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Subscriptions
                  </div>
                  <div className="col-sm-4 col-12">
                    $10000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Food + Others
                  </div>
                  <div className="col-sm-4 col-12">
                    $7000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Total
                  </div>
                  <div className="col-sm-4 col-12">
                    $17000
                  </div>
                </div>
              </div>
            </div>
            <h4>Monthly Savings</h4>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Car
                  </div>
                  <div className="col-sm-4 col-12">
                    $10000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Christmas
                  </div>
                  <div className="col-sm-4 col-12">
                    $7000
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    Total
                  </div>
                  <div className="col-sm-4 col-12">
                    $17000
                  </div>
                </div>
              </div>
            </div>



            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Dashboard;