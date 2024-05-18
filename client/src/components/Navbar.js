import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/toastContext";

const Navbar = ({ title = "CMS" }) => {
  const { user, setUser } = useContext(AuthContext);
  const {toast} = useContext(ToastContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand">{title}</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {" "}
                <li className="nav-item" onClick={() => {
                  setUser(null);
                  localStorage.clear();
                  toast.success("Logged out...");
                  setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 2000); 
                }}>
                  <button className="btn btn-warning">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <a className="nav-link active">
                      Login
                      <span className="visually-hidden">(current)</span>
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <a className="nav-link">Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
