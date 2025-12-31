import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nb">
      <div className="navbar">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/form">From</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/signup">Sing-up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
