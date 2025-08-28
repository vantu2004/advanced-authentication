const userController = {
  getProfile: (req, res) => {
    try {
      res.status(200).json({ userId: req.userId, username: req.username });
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },
};

export default userController;
