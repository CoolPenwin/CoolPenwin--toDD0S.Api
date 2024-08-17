import React from "react";

//include images into your bundle
// import ToDoApi from "./ToDoApi";
// import MyComponent from "./user ";
import MyComponent from "./user+userlist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<MyComponent/>
			{/* <ToDoApi/> */}
		</div>
	);
};

export default Home;
