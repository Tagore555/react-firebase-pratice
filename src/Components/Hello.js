import React, { useEffect } from 'react'
import {db} from '../Config/firebase';
import { useState } from 'react';
import { getDocs,collection ,addDoc,deleteDoc,updateDoc,doc} from 'firebase/firestore';
import { ref,uploadBytes} from 'firebase/storage';
import { storage } from '../Config/firebase';

function Hello() {
    const [ movieList , setMovieList] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [newOscar, setNewOscar] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [fileupload, setFileupload] = useState(null);




    const movieCollection = collection(db,'movies');

    const fetchMovies = async () => {
        const data = await getDocs(movieCollection);
        const filterData= data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(filterData);
        setMovieList(filterData);
    };
    useEffect(() => {
        fetchMovies();
    });
    const register = async () => {
        await addDoc(movieCollection, {title: newTitle, releaseDate: newReleaseDate, oscar: newOscar});
        fetchMovies();
    };
    const deleteMovie = async (id) => {
        const movieDoc = doc(db, 'movies', id);
        await deleteDoc(movieDoc);
        fetchMovies();
    };
    const updateMovietitle = async (id) => {
        const movieDoc = doc(db, 'movies', id);
        await updateDoc(movieDoc,{title: updatedTitle});
        fetchMovies();
    };


    const fileuploaded = async () => {
        if(!fileupload){
            return;
        }
        const filefolder = ref(storage, `praticefolder/${fileupload[0].name}`);
        await uploadBytes(filefolder, fileupload[0]);
    };

    return (
        <div>
            <div>
                <input type="text" placeholder="Enter your movie title" onChange={(e)=>setNewTitle(e.target.value)}/><br />
                <input type="text" placeholder="Enter your movie release date" onChange={(e)=>setNewReleaseDate(e.target.value)}/><br />
                <input type='checkbox' checked={newOscar} onChange={(e)=>setNewOscar(e.target.value)}/><br />
                <input type="submit" value="Submit" onClick={register}/>
            </div>
            {
            movieList.map((movie) => (
                <div key={movie.id}>
                    <h1 style ={{color: movie.oscar?"green" :"red"}}>{movie.title}</h1>
                    <h2>{movie.releaseDate}</h2>
                    <input type="submit" value="Delete" onClick={()=>deleteMovie(movie.id)} />
                    <input type="text" placeholder="Enter your updated movie title" onChange={(e)=>setUpdatedTitle(e.target.value)}/><br />
                    <input type="submit" value="Update" onClick={()=>updateMovietitle(movie.id)} />
                </div>
            ))
            }
            <div>
                <input type='file' onChange={(e)=>setFileupload(e.target.files)}/>
                <input type="submit" value="Submit" onClick={fileuploaded}/>
            </div>
        </div>
    )
}

export default Hello