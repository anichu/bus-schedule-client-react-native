import { createContext } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
export const AuthContext = createContext();
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("Home | resealPhone");

	const googleProvider = new GoogleAuthProvider();

	const providerLogin = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const handleGoogleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const updateUserProfile = (profile) => {
		return updateProfile(auth.currentUser, profile);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setLoading(false);
			setUser(currentUser);
			console.log(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		setLoading,
		providerLogin,
		logOut,
		updateUserProfile,
		createUser,
		signIn,
		handleGoogleSignIn,
		setTitle,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};
export default AuthProvider;
