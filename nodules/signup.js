
// Config Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Authentication
const auth = firebase.auth();
// Selecting the form elements
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Handle the signup form submission
signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate password match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!");
    return;
  }

  // Check password strength
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Create a new user with Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User successfully created
      const user = userCredential.user;
      console.log("User created:", user);
      // Optionally, you can update the user profile (e.g., add a display name)
      // user.updateProfile({
      //   displayName: "Username",
      // });

      // Redirect to the login page after successful signup
      window.location.href = "login.html"; // Change this to redirect to the desired page
    })
    .catch((error) => {
      // Handle errors (e.g., invalid email, weak password)
      const errorCode = error.code;
      const errorMessage = error.message;

      // Display appropriate error message
      if (errorCode === 'auth/email-already-in-use') {
        alert("The email address is already in use.");
      } else if (errorCode === 'auth/invalid-email') {
        alert("Invalid email address.");
      } else if (errorCode === 'auth/weak-password') {
        alert("Password is too weak. It must be at least 6 characters.");
      } else {
        alert(errorMessage); // General error
      }
    });
});
