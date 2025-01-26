const admin = require("../firebaseAdmin");
const { getAuth } = require("firebase-admin/auth");

// Sign-up controller
exports.signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: name,
    });

    res.status(201).json({
      message: "User created successfully",
      uid: userRecord.uid,
      name: userRecord.displayName,
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        email: userCredential.email,
        name: userCredential.displayName,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message });
  }
};
