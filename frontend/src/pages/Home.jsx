import React, { useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
    const [receipes, setReceipes] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/receipes') 
            .then((response) => {
                setReceipes(response.data.data); 
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Recipe List</h1>
                <Link to='/receipe/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md'>Prep Time</th>
                            <th className='border border-slate-600 rounded-md'>Cook Time</th>
                            <th className='border border-slate-600 rounded-md'>Servings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipes.map((receipe, index) => (
                            <tr key={receipe._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {receipe.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {receipe.prepTime} mins
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {receipe.cookTime} mins
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {receipe.servings}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                    <Link to={`/receipe/details/${receipe._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/receipe/edit/${receipe._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/receipe/delete/${receipe._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                    </div>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;