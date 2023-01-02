import { Link } from "react-router-dom"
// Using the import below, we can call any exported function using: userService.someMethod()
import * as userService from '../../utilities/users-service';
// import * as userService from '../utilities/users-service';
import styles from "./NavBar.module.css"

export default function NavBar({ name, setUser }) {

  function handleLogout() {
    // Delegate to the users-service
    userService.logOut()
    setUser(null)
  }

  return (
    <div className={styles.NavBar}>
      <div className={styles.NavBar}>
        <Link to="/orders">Order History</Link>
        &nbsp; | &nbsp;
        <Link to="/orders/new">New Order</Link>
        {/* <h1>Welcome, {name}</h1> */}
        &nbsp;&nbsp;<Link to="" onClick={handleLogout}>Log Out</Link>
      </div>
    </div>
  )

}