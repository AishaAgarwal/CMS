import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/resgister";
import {Routes as Switch, Route} from "react-router-dom";
// import AuthContextProvider from "./context/AuthContext";
const App = () => {
  return(
    <AuthContextProvider>
    <Layout>
      <Switch>
        <Route path = "/" element={<Home/>} />
        <Route path = "/login" element= {<Login/>} />
        <Route path = "/register" element= {<Register/>} />
      </Switch>
    </Layout>
    </AuthContextProvider>
  )
};

export default App;