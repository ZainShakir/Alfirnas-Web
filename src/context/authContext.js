import React,{useState,useEffect,useContext} from 'react'
import { getAuth, signInWithEmailAndPassword,signOut,sendPasswordResetEmail,onAuthStateChanged} from 'firebase/auth';
import {app} from "../Config/Config";
import Loading from '../Components/Loading/Loading';

const AuthContext=React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children})
{
   
    const [currentUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(true);
    const auth = getAuth(app);


    function login(email,password){
       return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
    }

    
  function logout() {
    return signOut(auth);
  }

    useEffect(()=>{
      
        const unsubscribe=onAuthStateChanged( auth,user=>{
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

     

    const value={
        currentUser,
        login,
        logout,
        resetPassword
    }

     while(loading)
    {
            return <Loading/>
    }

    return(
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
    )
}