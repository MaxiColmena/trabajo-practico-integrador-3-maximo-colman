import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../components/Loading";

export const Home = () => {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
};
