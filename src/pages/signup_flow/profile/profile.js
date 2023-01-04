import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import UserApi from "../../../api/UserApi";
import UserGraphQL from "../../../graphql/UserGraphQL";
import Auth from "../../../components/auth/auth";

function SignUpProfile() {

    let navigate = useNavigate();

    const [user, setUser] = useState({
        uuid: Auth.getAuth()['uuid'],
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        account: {
            address: {}
        }
    });
    const [address, setAddress] = useState({
        street: "",
        street2: "",
        city: "",
        zipcode: "",
        state: "",
        country: "",
        longitude: 0,
        latitude: 0,
        timezone: ""
    });

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        console.log("SignUpProfile")
        UserGraphQL.getProfile()
        .then((response) => {
            let savedProfile = response?.data?.data['users'][0]
            console.log("savedProfile: ", savedProfile);

            setUser(savedProfile)

            let savedAddress = savedProfile.account.address

            setAddress(savedAddress)

        }).catch((error) => {
            console.error("Error: ", error);
        });
        // signUpWithEmailAndPassword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUserInputChange = (e) => {
        setUser({
        ...user,
        [e.target.name]: e.target.value,
        });
    };
    const handleAddressInputChange = (e) => {
        setAddress({
        ...address,
        [e.target.name]: e.target.value,
        });
    };

    const update = () => {
        let userInfo = user
        userInfo['account']['address'] = address

        UserApi.updateProfile(userInfo)
        .then((response) => {
            console.log("response: ", response);
            navigate("/signup/income");
        }).catch((error) => {
            console.error("Error: ", error);
            setErrorMsg(error)
        });
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Your Profile</h2>
                        
                        {errorMsg && 
                            <div className="row">
                                <div className="col-12">
                                    <div className="alert alert-danger" role="alert">
                                        {errorMsg}
                                    </div>
                                </div>
                            </div>
                        }
                        <h4>Personal Info</h4>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">First Name</label>
                                    <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="firstname"
                                    value={user.firstName || ''}
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
                                    value={user.lastName || ''}
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
                                    value={user.phoneNumber || ''}
                                    onChange={handleUserInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="3101234567"/>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <h4>Address</h4>
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="mb-3">
                                    <label  className="form-label">Street</label>
                                    <input 
                                    id="street"
                                    name="street"
                                    autoComplete="street"
                                    value={address.street || ''}
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
                                    value={address.street2 || ''}
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
                                    value={address.city || ''}
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
                                    value={address.state || ''}
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
                                    value={address.zipcode || ''}
                                    onChange={handleAddressInputChange}
                                    required
                                    className="form-control" 
                                    placeholder="80434"/>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-2 offset-sm-10 col-6">
                                <div className="d-grid gap-2 float-right">
                                    <button onClick={()=>update()} type="button" className="btn btn-primary">Save</button>
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

export default SignUpProfile;