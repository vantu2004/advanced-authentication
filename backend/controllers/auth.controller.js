export const login = (req, res) => {
  const { email, password } = req.body;
  // Perform login logic here
  res.send("Login successful");
};

export const register = (req, res) => {
  const { email, password } = req.body;
  // Perform registration logic here
  res.send("Registration successful");
};

export const logout = (req, res) => {
  // Perform logout logic here
  res.send("Logout successful");
};
