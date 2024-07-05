import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/toastContext";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";
import CreateContact from "./pages/createContact";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/resgister";
import { Routes as Switch, Route } from "react-router-dom";
// import AuthContextProvider from "./context/AuthContext";
const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element= {<CreateContact/>} />
            <Route path="/mycontacts" element={<AllContact />} />
            <Route path="/edit/:id" element={<EditContact/>}/>
          </Switch>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
