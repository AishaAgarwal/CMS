import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
   
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    useEffect(() => {
        !user && navigate("/login",{replace: true});
    }, []);
    return <>
   <div class="jumbotron">
  <h1>Welcome {user ? user.name : null}</h1>
 
  <p class="lead">
    <a class="btn btn-info btn-lg" href="#" role="button">Add Contacts</a>
  </p>
</div>
</>
};

export default Home;