import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
const Login = () => {
    const {loginUser} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name] : value});
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!credentials.email || !credentials.password){
            toast.error("please enter all the required fields!");
            return;
       
        }
        loginUser(credentials);
    }
  return (
    <>
    <ToastContainer autoClose = {2000}></ToastContainer>

      <h3> Login </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            <label htmlFor="emailInput" className="form-label mt-4">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              fdprocessedid="1hd4qs"
            />
           
          </div>
          <div>
            <label htmlFor="passwordInput" className="form-label mt-4">
              Password 
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              aria-describedby="passwordHelp"
              placeholder="Enter password"
             
            />
          
          </div>
          <input type="submit" value="Login" className="btn btn-primary my-3"/>
           <p> Don't have an account? <Link to="/register"> Create One</Link></p>
        </div>
      </form>
    </>
  );
};

export default Login;
