import { Link } from "react-router-dom";

const Register = () => {
    return <>
    <h3> Register </h3>
      <form>
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
              aria-describedby="passwordHelp"
              placeholder="Enter password"
             
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