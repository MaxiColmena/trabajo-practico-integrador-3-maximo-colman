import { Router, Route } from "react-router";

export const AppRouter = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Router>
  );
}