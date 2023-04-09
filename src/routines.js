import React, { useState } from 'react' 
import {Link} from "react-router-dom"

const Routines = (props) => {

    return(
        <div id="routines">
            <h1>Public Routines</h1>
        {
            props.routines.map((routine, index)=>{
                return(
                    
                    <div id="routineList" key={index}>
                                <ul>
                                    <li>Name: {routine.name} </li>
                                    <li>Goal: {routine.goal}</li>
                                    <li>Creator: {routine.creatorName}</li>
                                </ul>
                            </div>
                )
            })
        }
        </div>

)                   
}

export default Routines