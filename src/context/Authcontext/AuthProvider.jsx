import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== Create User ==========
  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          const updatedUser = { ...auth.currentUser };

          // Backend এ save করবো default role = member
          fetch("https://fit-verse-server-nine.vercel.app/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              email: updatedUser.email,
              photoURL: photoURL,
              role: "member",
            }),
          });

          setUser(updatedUser);
          return updatedUser;
        });
      }
    );
  };

  // ========== Sign In ==========
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ========== Google Sign In ==========
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).then((result) => {
      // Save user in backend with default role
      fetch("https://fit-verse-server-nine.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: "member",
        }),
      });
      return result;
    });
  };

  // ========== Log Out ==========
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ========== Firebase Auth Listener ==========
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          // Fetch role from backend
          const res = await fetch(`https://fit-verse-server-nine.vercel.app/users/${currentUser.email}`);
          const data = await res.json();

          if (data?.role) {
            setUser({ ...currentUser, role: data.role });
          } else {
            setUser({ ...currentUser, role: "member" });
          }
        } catch (error) {
          console.error("Error fetching role:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
