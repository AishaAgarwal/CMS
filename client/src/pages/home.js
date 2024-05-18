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
    This is home page</>
};

export default Home;