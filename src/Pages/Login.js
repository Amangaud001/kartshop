import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    console.log("Login Payload:", data);
    setSuccessMessage(`Welcome back, ${data.email}!`);
    reset();
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="login-btn">Login</button>

        <p style={{ marginTop: "15px", fontSize: "13px", textAlign: "center" }}>
          Don't have an account? <Link to="/register" style={{ color: "#0d6efd" }}>Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;