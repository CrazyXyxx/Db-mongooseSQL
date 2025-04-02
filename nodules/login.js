
// Votre configuration Firebase (Remplacez par les informations de votre projet)
var firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Fonction pour l'inscription des utilisateurs
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Vérification des mots de passe
    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    // Inscription de l'utilisateur
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // L'utilisateur a été créé avec succès
            const user = userCredential.user;
            
            // Ajouter des informations supplémentaires dans Firestore (par exemple, le nom de l'utilisateur)
            firestore.collection("users").doc(user.uid).set({
            email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                profilePicture: "default_picture_url" // Par défaut, vous pouvez ajouter une image de profil ou la mettre à jour plus tard
            }).then(() => {
                // Rediriger l'utilisateur après l'inscription réussie
                window.location.href = 'confession.html'; // Modifier la redirection selon vos besoins
            }).catch((error) => {
                console.error("Erreur lors de l'ajout des informations utilisateur : ", error);
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Erreur : ${errorMessage}`);
        });
});

// Fonction pour la connexion des utilisateurs
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Connexion de l'utilisateur
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Rediriger l'utilisateur vers confession.html après une connexion réussie
            window.location.href = 'confession.html'; // Modifier la redirection selon vos besoins
        )
        .catch((error) => 
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Erreur :{errorMessage}`);
        });
});
