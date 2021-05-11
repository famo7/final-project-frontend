import React from "react";

export default function LoginForm({
  handleLogin,
  socialSecurityNumber,
  setSocialSecurityNumber,
  password,
  setPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={socialSecurityNumber}
          name="socialSecurityNumber"
          onChange={({ target }) => setSocialSecurityNumber(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}
