import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";


const Entry = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

      navigate("/dashboard"); // 👈 goes to Dashboard (index route in your RootLayout)
 
  }, [isAuthenticated]);

  return null; // nothing is shown
};

export default Entry;
