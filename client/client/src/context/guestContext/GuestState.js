import React, {useReducer} from 'react'
import GuestContext from './guestContext'
import guestReducer from './guestReducer'
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT
    

} from '../types'

const GuestState = (props) => {


    const initialState = {

        filterGuest : false, //es el boton de true y falso para filtrar los confirmados.
        search:null,      // primero pusimos null porque no hay nada que buscar todavia. 
        editAble:null,

    guests: [
        {
            id:1,
            name:'jake Smith',
            phone: '333 444 6666',
            dietary: 'Vegan',
            isconfirmed: true

        },
        {
            id:2,
            name:'Merry Williams',
            phone: '222 777 6666',
            dietary: 'Non-Veg',
            isconfirmed: true

        },
        {
            id:3,
            name:'Azhann Idrees',
            phone: '333 777 5555',
            dietary: 'Pascatarian',
            isconfirmed: false

        }
    ]
}

    



    const [state,dispatch] = useReducer(guestReducer, initialState)
    
//Remove guest
    const removeGuest = (id) => {
        dispatch({
            type:REMOVE_GUEST,
            payload:id
        })
       
    }
//updateguest

    const updateGuest = (guest) => {
        dispatch({
            type:UPDATE_GUEST,
            payload:guest
        })
    } 
//editguest
    const editGuest = (guest) => {
        dispatch({
            type:EDIT_GUEST,
            payload: guest
        })
    } 

    const clearEdit = () => {
        dispatch({
            type:CLEAR_EDIT
            
        })
    } 



//Add guest
    const addGuest = (guest) =>{
        guest.id = Date.now()
        guest.isconfirmed=false
        dispatch({
            type:ADD_GUEST,
            payload:guest
        })
    }

    const toggleFilter = () => {
        dispatch ({
            type: TOGGLE_FILTER
        })
    }

    const searchGuest = (guest) => {
        dispatch({
            type: SEARCH_GUEST,
            payload: guest
        })
    }

    const clearSearch = () => {
            dispatch({
                type:CLEAR_SEARCH
                
        })
    }
    
    return (
        <GuestContext.Provider
        value ={{
          
            guests:state.guests,
            filterGuest :state.filterGuest,
            search: state.search,
            editAble: state.editAble,
            addGuest,
            removeGuest,
            updateGuest,
            editGuest,
            clearEdit,
            toggleFilter,
            searchGuest,
            clearSearch

        }}
        >
            {props.children}
        </GuestContext.Provider>
    )
}

export default GuestState
