import { Router, Route } from "react-router";
import { Login } from "../pages/auth/Login";

export const AppRouter = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Router>
  );
}