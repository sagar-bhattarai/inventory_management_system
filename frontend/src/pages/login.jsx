import React from "react";

const Login = () => {
  return (
    <div className="login-container flex flex-col justify-center items-center w-full h-[100vh]">
      <h1 className="font-bold text-lg mb-5">login</h1>
      <div className="form-container border p-9 rounded">
        <form className="login-form flex flex-col justify-center items-center">
          <div className="form-group py-3 flex justify-between w-full">
            <label htmlFor="email">Email</label>
            <input className="rounded border ml-3 py-[2px] px-3" type="text" name="email" id="email" required />
          </div>
          <div className="form-group py-3 flex justify-between w-full">
            <label htmlFor="password">Password</label>
            <input className="rounded border ml-3 py-[2px] px-3" type="password" name="password" id="password" required />
          </div>
          <button className="rounded border mt-3 py-[2px] px-3 w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
