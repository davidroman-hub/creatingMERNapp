import React, {useReducer} from 'react'
import GuestContext from './guestContext'
import guestReducer from './guestReducer'
import {
    TOGGLE_FILTER
} from '../types'

const GuestState = (props) => {


    const initialState = {

        filterGuest : false,

    guests: [
        {
            id:1,
            name:'jake Smith',
            phone: '333 444 6666',
            dietary: 'Vegan',
            isconfirmed: false

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

    const toggleFilter = () => {
        dispatch ({
            type: TOGGLE_FILTER
        })
    }
    
    return (
        <GuestContext.Provider
        value ={{
          
            guests:state.guests,
            filterGuest :state.filterGuest,
            toggleFilter

        }}
        >
            {props.children}
        </GuestContext.Provider>
    )
}

export default GuestState
