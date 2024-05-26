// Import the User service 
const UserService = require('../services/user.service');
// Create the add User controller
async function createUser(req, res) {

  console.log(req.body); 

  // Check if User email already exists in the database 
  const UserExists = await UserService.checkIfUserExists(req.body.email);
  // If User exists, send a response to the client
  if (UserExists) {
    res.status(400).json({
      error: "This email address is already associated with another User!"
    });
  } else {
    try {
      const UserData = req.body;
      console.log(UserData)
      // Create the User
      const User = await UserService.createUser(UserData);
      if (!User) {
        res.status(400).json({
          error: "Failed to add the User!"
        });
      } else {
        res.status(200).json({
          status: "true",
          data: User
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!"
      });
    }
  }
}

// Create the getAllUsers controller 
async function getAllUsers(req, res, next) {
  // Call the getAllUsers method from the User service 
  const Users = await UserService.getAllUsers();
  // console.log(Users);
  if (!Users) {
    res.status(400).json({
      error: "Failed to get all Users!"
    });
  } else {
    res.status(200).json({
      status: "success",
      data: Users,
    });
  }
}

// Export the createUser controller 
module.exports = {
  createUser,
  getAllUsers
};