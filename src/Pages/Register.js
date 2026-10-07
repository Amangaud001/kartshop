import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  
  const [successMessage, setSuccessMessage] = useState("");
  const passwordValue = watch("password");

  const onSubmit = (data) => {
    console.log("Registration Payload:", data);
    setSuccessMessage(`Registration successful! Welcome, ${data.name}.`);
    reset();
  };

  return (
    <div className="login-container">
      <h2>User Registration</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="reg-name">Name</label>
          <input
            id="reg-name"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            placeholder="Create password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="reg-confirm-password">Confirm Password</label>
          <input
            id="reg-confirm-password"
            type="password"
            placeholder="Re-enter password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) => val === passwordValue || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="login-btn">Register</button>

        <p style={{ marginTop: "15px", fontSize: "13px", textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "#0d6efd" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;