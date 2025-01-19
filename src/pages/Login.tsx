import { Link, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import {RootState} from "../store/Store.ts";
import "../style/Login.css";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const users = useSelector((state: RootState) => state.user.users);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Define permissions for each role
    const permissions = {
        manager: ["/dashboard", "/staff", "/field", "/crop", "/equipment", "/vehicle", "/monitoring", "/logout"],
        administrator: ["/dashboard", "/field", "/crop", "/equipment", "/logout"],
        scientist: ["/dashboard", "/staff","/equipment", "/vehicle", "/logout"],
    };

    const loginHandler = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if user exists
        const userExists = users.find(
            (user) => user.email === email && user.password === password
        );

        if (userExists) {
            const userRole = userExists.role.toLowerCase();
            if (permissions[userRole]) {
                alert("User logged in successfully!");
                clear();
                navigate("/dashboard", { state: { role: userRole, permissions: permissions[userRole] } });
            } else {
                alert("Role is not recognized!");
            }

        } else {
            alert("Invalid email or password!");
        }
    };

    function clear(){
        setEmail("");
        setPassword("");
    }

    return (
        <div className="h-[100vh] flex justify-center items-center bg-cover bg-center login-bg">
            <div className="wrapper">
                <form onSubmit={loginHandler}>
                    <div className="input-box">
                        <input type="email"
                               placeholder="Email"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password"
                               placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <FaLock className="icon" />
                    </div>

                    <button type="submit" className="hover:bg-[#23911A51] hover:text-white transition-colors duration-300">LOGIN</button>

                    <div className="class-link">
                        <p>Don't have an account ?
                            <Link to="/Register"> Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
