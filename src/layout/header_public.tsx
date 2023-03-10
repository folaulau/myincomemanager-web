import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
function PublicHeader() {

    useEffect(() => {
      // eslint-disable-line react-hooks/exhaustive-deps
    }, []);

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

                    <Link to="/signup" className="me-3 py-2 text-dark text-decoration-none">Sign Up</Link>

                    <Link to="/signin" className="me-3 py-2 text-dark text-decoration-none">Sign In</Link>

                    {/* <CartIcon /> */}

                </nav>
            </div>
        </header>
    );
}

export default PublicHeader;