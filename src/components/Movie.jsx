import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from "../context/AuthContext";
import { db } from '../Firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Movie = ({ item }) => {

    const [like, setLike] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const movieId = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieId, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.poster_path
                })
            })
        } else {
            alert('Please login to save a movie');
        }
    }


    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2 cursor-pointer'>
            <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                alt={item?.title}
            />
            <div className='absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80  hover:opacity-100 text-white'>
                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                <p onClick={saveShow} >
                    {like ? (
                        <FaHeart className='absolute top-4 left-4 text-gray-300' />
                    ) : (
                        <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
                    )}
                </p>
            </div>
        </div>
    )
}

export default Movie