import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "./components/Auth/Authcontext";

const SocialLogin = () => {
  const { singInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    singInWithGoogle()
      .then((result) => {
        console.log(result.user);

        Swal.fire({
          title: "Login Successful!",
          text: `Welcome, ${result.user.displayName}`,
          icon: "success",
          confirmButtonText: "Go to Dashboard",
        }).then(() => {
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error.message);

        Swal.fire({
          title: "Login Failed!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <button onClick={handleGoogleSignIn} className="btn btn-outline mt-4">
      Sign in With Google <FcGoogle className="size-8" />
    </button>
  );
};

export default SocialLogin;
