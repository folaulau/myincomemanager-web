import React, { useEffect } from 'react';
import Auth from '../components/auth/auth';
import './header.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {

    let navigate = useNavigate();

    useEffect(() => {
  
        if(!Auth.getAuth()){
            window.location.href = "/signin";
        }
      // eslint-disable-line react-hooks/exhaustive-deps
    }, []);

    const signOut = () => {
        Auth.signOut();
        navigate("/signin")
    }

    return (
        <header className="container mt-3">      
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <a
                href="/"
                className="d-flex align-items-center text-dark text-decoration-none"
                >
                    {/* <img src={logo} alt="logo" /> */}
                    <span className="fs-4">My Income Manager</span>
                </a>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

                    <Link to="/pricing" className="me-3 py-2 text-dark text-decoration-none">Pricing</Link>
                    
                    <Link to="/how-it-works" className="me-3 py-2 text-dark text-decoration-none">How it works</Link>

                    <span onClick={()=>signOut()} className="me-3 py-2 text-dark text-decoration-none signOutLnk">Sign Out</span>

                    {/* <CartIcon /> */}

                </nav>
            </div>
        </header>
    );
}

export default Header;