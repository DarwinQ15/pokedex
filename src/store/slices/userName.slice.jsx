import { createSlice } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const userNameSlice = createSlice({
	name: 'userName',
    initialState: '',
    reducers: {
        changeName: (state, action) => {
            const userName = action.payload;
            return userName
        },
        changeClean: ()=>{
            return ''
        }
    }
})

export const { changeName, changeClean } = userNameSlice.actions;

export default userNameSlice.reducer;