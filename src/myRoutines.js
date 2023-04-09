import React, { useState, useEffect } from 'react'
import Axios from 'axios'


const MyRoutines = (props) => {
    const [currentUser, setCurrentUser] = useState([])
    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [isPublic, setIsPublic] = useState(false)

    const getUserData = async () => {
        try{
            const user = await Axios.get('/api/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                    },
            })
            const response = await Axios.get(`/api/users/${user.data.username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                    },
            })
            setCurrentUser(response.data)
        }catch(err){
            console.log(error)
        }
    }

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

    useEffect(() => {
        getUserData()
    }, [])

    if(currentUser){
    return(
        <div>
            {
                currentUser.map((routine, index)=> {
                return (
                    <div key={index}>
                        <ol>
                            <li>{routine.goal}</li>
                        </ol>
                    </div>
                )})
            }
        <form onSubmit={createRoutine}>
            <label>Name:</label>    
            <input type="text" placeholder="name" id="name" value={name} onChange={(event) => setName(event.target.value)}></input>
            <label>Goal:</label>  
            <input type="text" placeholder="goal" id="goal" value={goal} onChange={(event) => setGoal(event.target.value)}></input>
            <label> Is Public</label>
            <input type="checkbox" id='isPublic'checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)}></input>
            <button id="createRoutine" type='submit'> Create Routine </button>
        </form>
        </div>
    )
    }else{
        return(
            <div>
                <p>loading...</p>
            </div>

        )
    }
}

export default MyRoutines