import { Link } from "react-router-dom";
import "../theme.css";
import "../App.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const UserRegister = () => {

    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();

        const fullname = e.target.fullname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response =  await axios.post("http://localhost:3000/api/auth/user/register", {
            fullname: fullname,
            email: email,
            password: password
        },{
            withCredentials: true
        });

        console.log(response.data);

        navigate("/user/login");

    };

    return ( 
        <div className="form-container">
            <h2>User Registration</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <button type="submit">Register</button>
            </form>
            <div className="form-links">
                <span>Already registered? <Link to="/user/login">Login</Link></span>
                <span>Or <Link to="/foodpartner/register">Register as Food Partner</Link></span>
            </div>
        </div>
    );
};

export default UserRegister;
