
import React, { useState } from "react";
import ExcuseMoi_Button from './BotonVistaMejoras.jsx';

//include images into your bundle
// import ToDoApi from "./ToDoApi";
// import MyComponent from "./user ";
import MyComponent from "./user+userlist.jsx";
import Footer from "./footer.jsx";

//create your first component
const Home = () => {

const [showImprovements, setShowImprovements] = useState(false);
const toggleImprovements = () => {
	setShowImprovements(!showImprovements);}
 return (

  <>
  <ExcuseMoi_Button  // boton siempre visible
  showImprovements={showImprovements}
  toggleImprovements={toggleImprovements}
  />

 {!showImprovements && (
  <div>
    <div className="text-center">
			<MyComponent/>
			{/* <ToDoApi/> */}
			<Footer/>
		</div>
		</div>
  )} 

  {showImprovements && (
    <>
    //Extras ocultos
    
    <Footer />
    </>
  )}

</> );};

export default Home;