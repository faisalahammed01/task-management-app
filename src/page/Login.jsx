import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";
import AuthContext from "../components/Auth/Authcontext";

const Login = () => {
  const { singInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    singInUser(email, password)
      .then((result) => {
        console.log("sign in", result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-72 md:w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-4xl md:text-5xl font-bold dark:text-gray-950">
            Login now!
          </h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered dark:text-gray-950"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered dark:text-gray-950"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-black glass btn-neutral">Login</button>

              <p className="text-start mt-4 dark:text-gray-950">
                Don't have an account?{" "}
                <Link className="text-red-600" to="/register">
                  Register Now!
                </Link>
              </p>
            </div>
          </form>
          <div className="mb-3 ml-4 text-center">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
