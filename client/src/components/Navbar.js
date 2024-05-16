import {Link} from "react-router-dom"

const Navbar = ({title = 'CMS'}) => {
    return(
        <nav class="navbar navbar-expand-lg bg-light" data-bs-theme="light">
  <div class="container-fluid">
    <Link to="/">
    <a  class="navbar-brand">{title}</a>
    </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor03">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <Link to="/login">
          <a class="nav-link active" >Login
            <span class="visually-hidden">(current)</span>
          </a>
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/register">
          <a class="nav-link" >Register</a>
          </Link>
        </li>
        
       
       
      </ul>
      
    </div>
  </div>
</nav>
    )
}

export default Navbar;