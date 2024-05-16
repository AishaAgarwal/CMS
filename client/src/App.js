import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/resgister";
import {Routes as Switch, Route} from "react-router-dom";
const App = () => {
  return(
    <Layout>
      <Switch>
        <Route path = "/" element={<Home/>} />
        <Route path = "/login" element= {<Login/>} />
        <Route path = "/register" element= {<Register/>} />
      </Switch>
    </Layout>
  )
};

export default App;