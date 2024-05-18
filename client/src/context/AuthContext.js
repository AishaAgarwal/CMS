import { createContext, useContext, useEffect, useState } from "react";
import ToastContext from "./toastContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const {toast} = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkUserLoggedIn();
    }, []);
    const checkUserLoggedIn = async () => {
        try{
            const res = await fetch(`http://localhost:8000/api/me`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if (!result.error){
                setUser(result);
                navigate("/", {replace: true});
            }
            else{
                console.log(result);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const loginUser = async(userData) => {
        try{
            const res = await fetch(`http://localhost:8000/api/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...userData}),
            });
            const result = await res.json();
            if (!result.error){
                localStorage.setItem("token",result.token);
                // console.log(result);
                setUser(result.user);
                toast.success(`Logged in ${result.user.name}`);
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 2000); 
            }
            else{
                toast.error(result.error);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    const registerUser = async (userData) => {
        try{
            const res = await fetch(`http://localhost:8000/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...userData}),
            });
            const result = await res.json();
            if (!result.error){
               toast.success("User registered successfully! Now login into your account!");
               setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000); 
            }
            else{
               toast.error(result.error);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (<AuthContext.Provider value={{loginUser, registerUser, user, setUser}}>{children} </AuthContext.Provider>);
}

export default AuthContext;