import React, { useEffect, useState } from "react";
import './index.css';
import imageHotel from "../../assets/hotel01.png";

import Login from "./login";

type LoginPageProps = {
  onLogin: (token: string) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    if (!token) {
        return (
            <div className="login_page">
                <div className="login_container">
                    <div className="login_image">
                        <div className="login_image_image">
                            <img src={imageHotel} alt="Hotel" className="login_image_img" />
                        </div>
                    </div>
                    <div className="login_form">
                        <div className="login_form_card">
                            <div><h2>Login</h2></div>
                            <Login onLogin={onLogin}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
}

export default LoginPage;
