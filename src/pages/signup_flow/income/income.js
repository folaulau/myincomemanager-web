import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import UserApi from "../../../api/UserApi";
import Auth from "../../../components/auth/auth";

function SignUpIncome() {

    let navigate = useNavigate();

    const [incomes, setIncomes] = useState([{
        id: 0,
        uuid: "",
        payType: "",
        payPeriod: "",
        payPeriodNetAmount: 0,
        yearlyTotal: 0,
        companyName: 0,
        position: "",
        startDate: "",
        endDate: ""
    }]);

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        console.log("SignUpIncome")
        // signUpWithEmailAndPassword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUserInputChange = (e, index) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log("name: "+name)
        console.log("value: "+value)
        console.log("index: "+index)
        let currentIncomes = [...incomes]

        let income = currentIncomes[index]
        income[name] = value
        currentIncomes[index] = income
        setIncomes(currentIncomes);
    };

    const updateIncome = () => {
        console.log(user)
        console.log(address)
        let incomeInfo = [...incomes]
        userInfo['account']['address'] = address

        UserApi.updateProfile(userInfo)
        .then((response) => {
            console.log("response: ", response);
            
        }).catch((error) => {
            console.error("Error: ", error);
        });
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1>Profile</h1>
                        
                        {errorMsg && 
                            <div className="row">
                                <div className="col-12">
                                    <div className="alert alert-danger" role="alert">
                                        {errorMsg}
                                    </div>
                                </div>
                            </div>
                        }
                        <h3>Personal Info</h3>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">First Name</label>
                                    <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="firstname"
                                    value={user.firstName}
                                    onChange={handleUserInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="John"/>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Last Name</label>
                                    <input 
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="lastName"
                                    value={user.lastName}
                                    onChange={handleUserInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="Doe"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Email</label>
                                    <input 
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={handleUserInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="johndoe@gmail.com"/>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Phone Number</label>
                                    <input 
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    autoComplete="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleUserInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="3101234567"/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <h3>Address</h3>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Street</label>
                                    <input 
                                    id="street"
                                    name="street"
                                    autoComplete="street"
                                    value={address.street}
                                    onChange={handleAddressInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="123 rd"/>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Street 2</label>
                                    <input 
                                    id="street2"
                                    name="street2"
                                    autoComplete="street2"
                                    value={address.street2}
                                    onChange={handleAddressInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="#23"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">City</label>
                                    <input 
                                    id="city"
                                    name="city"
                                    autoComplete="city"
                                    value={address.city}
                                    onChange={handleAddressInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="Lehi"/>
                                </div>
                            </div>
                            <div className="col-sm-3 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">State</label>
                                    <input 
                                    id="state"
                                    name="state"
                                    autoComplete="state"
                                    value={address.state}
                                    onChange={handleAddressInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="UT"/>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Zipcode</label>
                                    <input 
                                    id="zipcode"
                                    name="zipcode"
                                    autoComplete="zipcode"
                                    value={address.zipcode}
                                    onChange={handleAddressInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="80434"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="d-grid gap-2">
                                    <button onClick={()=>updateIncome()} type="button" className="btn btn-primary">Save</button>
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

export default SignUpIncome;