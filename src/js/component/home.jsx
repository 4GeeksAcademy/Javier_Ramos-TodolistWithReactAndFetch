import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
	const[tasks,setTasks] = useState([]);
    const[task,setTask]= useState("");
	
	useEffect(()=>{
		fetchPostUser();
		fetchGetTasks();
	},[])
	
	const fetchPostUser = ()=>{ 
		fetch('https://playground.4geeks.com/todo/users/Javier',{
			method:"POST",
		})
		.then(response=>response.json())
		.then(data=>{
			console.log(data);
		})
		.catch(error=>console.log(error));
	};
	
	const fetchGetTasks = ()=>{
		fetch('https://playground.4geeks.com/todo/users/Javier',{
			method:"GET"
		})
		.then(response=>response.json())
		.then(data=>setTasks(data.todos))
		.catch(error=>console.log(error));
	};
	
	const fetchPostTask = ()=>{
		const newTask={
			label: task,
			is_done: false
		}
		fetch('https://playground.4geeks.com/todo/todos/Javier',{
			method:"POST",
			body: JSON.stringify(newTask),
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(response=>response.json())
		.then(data=>{
			console.log(data);
			fetchGetTasks()
			setTask("");
		})
		.catch(error=>console.log(error));
	};

	const fetchDeleteTask = (id)=>{
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
			method:"DELETE",
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(response=>console.log(response))
		.then(data=>{
			console.log(data);
			fetchGetTasks()
		})
		.catch(error=>console.log(error));
	};

	const fetchDeleteAllTasks = ()=>{
		fetch(`https://playground.4geeks.com/todo/users/Javier`,{
			method:"DELETE",
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(response=>console.log(response))
		.then(data=>{
			console.log(data);
			fetchPostUser();
			fetchGetTasks();
		})
		.catch(error=>console.log(error));
	};

	console.log(tasks)

	function pressEnter(e){
		if(e.key === "Enter"){
			fetchPostTask()
	};
}
	return (
		<div className="text-center">
			<h1 className="cabecera mt-5"><b>To Do List</b></h1>
			<div>
				<input className="mb-5" type="text" placeholder="What needs to be done?" onChange={e => setTask(e.target.value)} value={task} onKeyDown={pressEnter}/>
			</div>
			<ul id="list" className="container">
				{tasks?.map((task,index)=>
					<li key={index} className="mb-3 row bg-light d-flex justify-content-between align-items-center">
						<div className="col-md-auto">{task.label}</div>
						<div className="col-md-auto"><i className="delete-Botton fas fa-trash-alt" onClick={()=>fetchDeleteTask(task.id)}></i></div>
					</li>
				)}
			</ul>
			<div className="d-flex justify-content-center align-items-center">
				<button type="button" className="btn btn-warning">{tasks?.length} tasks left</button>
				<button type="button" id="deleteAllTasks" className="btn btn-primary m-2" onClick={()=>fetchDeleteAllTasks()}>Take vacation</button>
			</div>
		</div>
	);
};

export default Home;
