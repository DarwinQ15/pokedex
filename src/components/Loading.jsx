import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/loading.css'


const Loading = () => {
    const loading = useSelector(state => state.isLoading)


    return (
        <>
            {loading && (
                <div className='overlay'>
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            )}
        </>
    );
};

export default Loading;