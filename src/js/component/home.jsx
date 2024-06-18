import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const[tasks,setTasks] = useState([]);
    const[newTask,setNewTask]=useState("");
	
	function mouseInside(){
		return
	}
	function mouseOut(){
		return
	}
	function pressEnter(e){
		e.key === "Enter"
		? addTask()
		: null
	}
	function addTask(){
		if(newTask.trim() !== ""){
			setTasks(t=>[...t,newTask]);
			setNewTask(""); 
		}
	}
	function deleteTask(index){
		const updatedTasks = tasks.filter((a,b)=> b !== index)
		setTasks(updatedTasks)
	}

	return (
		<div className="text-center">
			<h1 className="cabecera mt-5"><b>To Do List</b></h1>
			<div>
				<input className="mb-2" type="text" placeholder="What needs to be done?" onChange={e => setNewTask(e.target.value)} value={newTask} onKeyDown={pressEnter}/>
			 </div>
			<ul id="list" className="container">
				{tasks.map((task,index)=>
					<li className="mb-2 row bg-light d-flex justify-content-between align-items-center">
						<div className="col-md-auto">{task}</div>
						<div className="col-md-auto"><i className="delete-Botton fas fa-trash-alt" onClick={()=>deleteTask(index)}></i></div>
					</li>
				)}
			</ul>
			<h5>{tasks.length} tasks left</h5>
		</div>
	);
};

export default Home;
