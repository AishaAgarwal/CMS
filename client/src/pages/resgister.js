import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
const Register = () => {
    const {registerUser} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name] : value});
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!credentials.email || !credentials.password || !credentials.confirmPassword){
            toast.error("please enter all the required fields!");
            return;
        }
        if (credentials.password !== credentials.confirmPassword){
            toast.error("password do not match");
            return;
        }
        const userData = {...credentials, confirmPassword: undefined};
        registerUser(credentials);
    }
    return <>
    <ToastContainer autoClose = {2000}></ToastContainer>

    <h3> Register </h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <div>
            <label for="emailInput" class="form-label mt-4">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              fdprocessedid="1hd4qs"
            />
           
          </div>

          
          <div>
            <label for="passwordInput" class="form-label mt-4">
              Password 
            </label>
            <input
              type="password"
              class="form-control"
              id="passwordInput"
              name="password"
              onChange={handleInputChange}
              aria-describedby="passwordHelp"
              placeholder="Enter password"
             
            />
          
          </div>

          <div>
            <label for="nameInput" class="form-label mt-4">
              Name
            </label>
            <input
              type="name"
              class="form-control"
              id="nameInput"
              name="name"
              onChange={handleInputChange}
              aria-describedby="nameHelp"
              placeholder="Enter your name "
             
            />
          
          </div>

          <div>
            <label for="confirmPasswordInput" class="form-label mt-4">
              Confirm Password 
            </label>
            <input
              type="password"
              class="form-control"
              id="confirmPasswordInput"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
             
            />
          
          </div>
          <input type="submit" value="Register" className="btn btn-primary my-3"/>
           <p> Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
      </>
};

export default Register;