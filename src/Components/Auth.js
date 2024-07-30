import React,{ useState } from 'react'

import { auth,googleAuth } from '../Config/firebase'
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Auth() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const navigate = useNavigate();
    console.log(auth?.currentUser?.photoURL);
    const submit = async (e) => {
        await createUserWithEmailAndPassword(auth,email,password);
        navigate('/hello');
    };
    const signGoogle = async () => {
        try{
        await signInWithPopup(auth,googleAuth);
        
        }
        catch(err){
            console.log(err);
        }
        navigate('/hello');
    };
    return (
        <div>

            <input type="text" placeholder="Enter your email" onChange={(e)=> setEmail(e.target.value)}/><br />
            <input type="password" placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)}/> <br />
            <input type="submit" value="Submit" onClick={submit}/>
            <input type="submit" value="Google" onClick={signGoogle}/>
            <input type="submit" value="Sign Out" onClick={()=> signOut(auth)}/>
        </div>
    )
}

export default Auth