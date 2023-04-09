import React, { useState } from 'react' 
import {Link} from "react-router-dom"


const Routines = (props) => {
    let [userInfo, setUserInfo] = useState({
        name: "",
        goal: "",
        //isPublic:""
    })

    //let [ isPublic, setIsPublic ] = useState(false)

    const handleChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        let name = event.target.name;
        console.log("VALUE HERE", value)

        setUserInfo((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const createRoutine = async (event) => {
        event.preventDefault();
        console.log("DAS TOKEN", props.token)
        try {
            // if( userInfo.username === "true") {
            //     //setIsPublic(true)
            // }
          const response = await fetch(`api/routines`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
              name: userInfo.name,
              goal: userInfo.goal,
              isPublic: true
            })
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }

    return(
        <div id="routines">
            <h1>Public Routines</h1>
        {
            props.routines.map((routine, index)=>{
                return(
                    
                    <div id="routineList">
                                <ul>
                                    <li>
                                        {routine.name} 
                                    </li>
                                    <li>
                                        {routine.creatorId}
                                    </li>
                                </ul>
                                {console.log(typeof routine.creatorId, typeof props.id)}
                                {
                                    
                                    routine.creatorId === parseInt(props.id) ? 
                                    <button id="delete">Delete This Routine</button>
                                    :
                                    null
                                }
                            </div>
                    
                )
                
            })
        }
        <form>
            <label>
                Name:
                <input type="text" placeholder="name" name="name" onChange={handleChange}></input>

            </label>
            <label>
                Goal:  
                <input type="text" placeholder="goal" name="goal" onChange={handleChange}></input>

            </label>
            <label> 
                Is Public
                <input type="text" placeholder="isPublic" name="isPublic" onChange={handleChange}></input>
            </label>
            <button id="createRoutine" onClick={createRoutine}> Create Routine </button>
        </form>
        </div>

)                   
}

export default Routines