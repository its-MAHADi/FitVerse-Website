import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.init'


const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

   const createUser = (email,password,name,photoURL) => {
    setLoading(true)
    return createUserWithEmailAndPassword (auth,email,password).then(
      (result) => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL
        }).then(() => {
        const updatedUser = { ...auth.currentUser };
        setUser(updatedUser);
        return updatedUser;
        });
      }
    );
   }

   const signIn = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
   }

   const signInWithGoogle =() => {
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
   }

   const logOut = () => {
    setLoading(true);
    return signOut(auth);
   }

   useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentuser =>{
     setUser(currentuser);
    //  console.log(currentuser)
     setLoading(false);
    })
    return ()=>{
      unSubscribe();
    }
   },[])

    const authInfo = {
      user,
      loading,
      setUser,
      createUser,
      signIn,
      signInWithGoogle,
      logOut,
    }
  return (
    <AuthContext value={authInfo}>
     {children}
    </AuthContext>
  )
}

export default AuthProvider
