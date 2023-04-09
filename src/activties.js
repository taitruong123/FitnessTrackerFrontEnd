import React, { useState } from 'react' 



const Activities = (props) => {
    let [userInfo, setUserInfo] = useState({
        name: "",
        description: ""
    })

    //console.log(activities)
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

    const createNewActivity = async (event) => {
        event.preventDefault();
        
            try {
              const response = await fetch(`api/activities`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: userInfo.name,
                  description: userInfo.description
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
        <div id="activities">
            <h1> Activities </h1>
        {
            props.activities.map((activity, index)=>{
                return(
                    
                    <div id="activityList">
                        
                                <ul>
                                    <li>
                                        {activity.name} 
                                    </li>
                                </ul>
                            </div>
                        
                    
                )
                
            })
        } 
        { props.isLoggedin === true ?
            <form id="postActivity">

            <label >
                Name: 
                <input 
                type="text" 
                placeholder="name" 
                name="name"
                onChange={handleChange}>
                </input>
            </label>

            <label 
            
            >
            
            Description:
                <input 
                type="text" 
                placeholder="description" 
                name="description"
                onChange={handleChange}>
                </input>

            </label>

            <button 
            className="postActivityButton" 
            onClick={createNewActivity}
            >
            Post a New Activity!
            </button>
            </form> 
            : null
        }
        </div>

)                   
};


export default Activities