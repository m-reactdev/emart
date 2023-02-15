const UserModel = require("../models/UserStructure");

const registerUserWithGoogle = async (req, res) => {
  let {
    name,
    email,
    password,
    contactNumber,
    role,
    userType,
    socialLinks,
    location,
    intro,
    profileImage,
  } = req.body;

  let newData = new UserModel({
    name,
    email,
    password,
    contactNumber,
    role,
    userType,
    socialLinks,
    location,
    intro,
    profileImage,
  });

  newData
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your user has been created successfully.",
          data: newData,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create user.",
        });
      }
      console.log("Something went wrong to create user ", dbError);
    });
};

const registerUser = async (req, res) => {
  let {
    name,
    email,
    password,
    role,
    profileImage,
  } = req.body;

  password = btoa(password);

  let hasUserEmailExist = await UserModel.findOne({ email: email });

  if (hasUserEmailExist) {
    return res.status(501).send({
      status: false,
      message: "This user has already exist...!",
    });
  }

  let newData = new UserModel({
    name: name,
    email: email,
    password: password,
    role: role,
    profileImage: profileImage,
  });

  newData
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your user has been created successfully.",
          data: newData,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create user.",
        });
      }
      console.log("Something went wrong to create user ", dbError);
    });
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let hasUserEmailExist = await UserModel.findOne({
      email: email,
    });

    if (hasUserEmailExist) {
      let newPassword = atob(hasUserEmailExist.password);

      if (newPassword === password) {
        return res.status(200).send({
          status: true,
          message: "Login Successfully...!",
          data: hasUserEmailExist,
        });
      }

      return res.status(501).send({
        status: false,
        message: "Incorrect Password...!",
      });
    }

    return res.status(500).send({
      status: false,
      message: "No user found with this email...!",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  let {
    id,
    name,
    email,
    password,
    contactNumber,
    role,
    userType,
    socialLinks,
    location,
    intro,
    profileImage,
  } = req.body;

  let updatedUser = {
    id: id,
    name: name,
    email: email,
    password: password,
    contactNumber: contactNumber,
    role: role,
    userType: userType,
    socialLinks: socialLinks,
    location: location,
    intro: intro,
    profileImage: profileImage,
  };

  UserModel.findByIdAndUpdate(id, updatedUser, { new: true }, (err, user) => {
    if (!err) {
      return res.status(200).send({
        status: true,
        message: "User has been updated",
        data: user,
      });
    }

    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  });
};

module.exports = {
  registerUserWithGoogle,
  registerUser,
  loginUser,
  updateUser,
};
