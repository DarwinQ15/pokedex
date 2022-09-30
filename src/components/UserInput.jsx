import React from 'react';
import { useState } from 'react';
import '../styles/userinput.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/userName.slice';
import { setIsLoading } from '../store/slices/isLoading.slice';

const UserInput = () => {

    const dispatch= useDispatch();

    const [userName, setUserName] = useState('')

    const navigate = useNavigate();

    const dispatchUserName = () => {
        dispatch(setIsLoading(true))
        dispatch(changeName(userName))
        navigate('/character')
        setTimeout(()=>{
            dispatch(setIsLoading(false))
        }, 500)
    }

    return (
        <div className='container'>
            <div className='container-banner'>
                <h1 className='title'>Hello trainer!</h1>
                <img className='image-traine' src="https://www.megaidea.net/wp-content/uploads/2021/08/Pokemon05-540x1024.png" alt="" />
            </div>
                <p className='welcome'>Give me your name to start this crazy adventure</p>
            {/* <i class='bx bx-cog'></i> */}
            <form>
                <input placeholder='enter your name' type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                <button className='btn-user' onClick={dispatchUserName}><i class='bx bx-send'></i></button>
            </form>
        </div>
    );
};

export default UserInput;