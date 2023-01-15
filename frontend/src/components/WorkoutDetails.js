import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutDetails = ( {workout}) =>{

    const {dispatch} = useWorkoutsContext();

    // delete button handler
    const handleClick = async () => {
         const response = await fetch('/api/workouts/' + workout._id ,{
            method: "DELETE",
         })

         const json = await response.json();

         if(!response.ok) {
            return console.log(json.error);
         }

         if(response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: json})
         }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Created at: </strong>{workout.createdAt}</p>
            <span onClick ={handleClick}>delete</span>
        </div>
    )
} 



export default WorkoutDetails;