import { useForm } from "react-hook-form";
import "./Login.css";
import { useState } from "react";

function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [SuccessMessage, setSuccessMessage] = useState("");

  const onSubmit = (data) => {
    console.log("Registration Data", data);
    setSuccessMessage(`Login Successful! Welcome, ${data.name}.`);
    reset();
  }; // Removed the stray }; that was right below this line

  return (
    <div className="login-container">
      <h2>User Login</h2>
      
      {SuccessMessage && (
        <div className="success-message">
          {SuccessMessage}
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name : </label>
          <br />
          <input 
            id="name" 
            type="text" 
            placeholder="Enter your name"
            {...register("name", { required: "Name is Required" })} 
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email : </label>
          <br />
          <input 
            id="email" 
            type="email" 
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format"
                      },
            })} 
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <br />
          <input 
            id="password" 
            type="password" 
            placeholder="Password"
            {...register("password", { required: "Password is Required" })} 
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
