import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Multi-Factor Authentication (MFA) App</h1>
      <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
    </div>
  );
}

export default App;
