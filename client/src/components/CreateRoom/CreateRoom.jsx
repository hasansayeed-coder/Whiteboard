import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const socket = require('../../utils/socket');
const Modal = require('../../ui/Modal') ; 

const CreateRoom = ({onClose}) => {

    const[roomName , setRoomName] = useState('') ; 
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ; 

    const handleCreation = (e) => {
        e.preventDefault() ;

        if(roomName){
            roomName.trim() ; 
            socket.emit('createRoom' , {roomName}) ; 
            dispatch() ; 
            setRoomName('') ; 
            navigate('/') ; 
        }else{
            console.log("Error creating room !!") ;
        }
    }

    const handleClose = () => {
        onClose && onClose() 
    }
    return (
        <Modal onClose={onClose}>
            <div className="create-room-container">
                <form>
                    <input type="text" placeholder='Enter room name' value={roomName} onChange={(e) => setRoomName(e.target.value.trim())}/>
                    <button className='close-btn' onClick={handleClose}>
                        <img className='close-btn-img' alt></img>
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default CreateRoom;