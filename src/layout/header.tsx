import React, { useEffect } from 'react';
import Auth from '../components/auth/auth';

function Header() {

    useEffect(() => {
  
        if(!Auth.getAuth()){
            window.location.href = "/signin";
        }
      // eslint-disable-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className='row'>
                <div className="col-12">
                    header
                </div>
            </div>
        </div>
    );
}

export default Header;