import React from 'react';
import { useNavigate } from 'react-router-dom';
import './join.css';

const Join = () => {
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        let params = new FormData(e.currentTarget);

        let name = params.get('name');
        let room = params.get('room');

        navigate(`/chat?name=${name}&room=${room}`);
    };

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        placeholder='Name'
                        className='joinInput'
                        type='text'
                        name='name'
                    />
                    <input
                        required
                        placeholder='Room'
                        className='joinInput mt-20'
                        type='text'
                        name='room'
                    />
                    <button className='button mt-20' type='submit'>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Join;
