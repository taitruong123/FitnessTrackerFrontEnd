import React, { useState } from 'react' 
import {Link} from "react-router-dom"

const Routines = (props) => {
    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)

console.log('daka daka', name, goal, isPublic)

    const createRoutine = async () => {
        console.log("DAS TOKEN", props.token)
        try {
          const routine = await fetch(`api/routines`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
            },
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic,
            })
        })
        setName('')
        setGoal('')
        setIsPublic(false)
        console.log(routine, 'response from create routine')
        } catch (err) {
          console.error(err);
        }
      }

      const deleteRoutine = async (routineId) => {
        console.log('fired')
        try{
            const deletedRoutine = await fetch(`api/routines/${routineId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
            })
            console.log(deletedRoutine, 'should work now')
        }catch(error){
            console.log(error)
        }
      }

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
                                {console.log(typeof routine.creatorId, typeof props.id)}
                                {
                                    routine.creatorId === parseInt(props.id) ? 
                                    <button id="delete" onClick={() => deleteRoutine(routine.id)}>Delete This Routine</button>
                                    :
                                    null
                                }
                            </div>
                )
            })
        }
        {
        <form onSubmit={createRoutine}>
            <label>Name:</label>    
            <input type="text" placeholder="name" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
            <label>Goal:</label>  
            <input type="text" placeholder="goal" id="goal" value={goal} onChange={(event) => setGoal(event.target.value)}></input>
            <label> Is Public</label>
            <input type="checkbox" id='isPublic'checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)}></input>
            <button id="createRoutine" type='submit'> Create Routine </button>
        </form>
        }
        </div>

)                   
}

export default Routines