
import React, { useState } from "react";
import ExcuseMoi_Button from './BotonVistaMejoras.jsx';

//include images into your bundle
// import ToDoApi from "./ToDoApi";
// import MyComponent from "./user ";
import MyComponent from "./user+userlist.jsx";
import Footer from "./footer.jsx";
import ToDoList from "./aaapi.v2.jsx";
import VisualTodDo from "./user.jsx";
import OseaVisualTodDo from "./userGayer.jsx";

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
      // gayer list
      <OseaVisualTodDo/>
			{/* <MyComponent/>funciona  */}
			{/* <ToDoApi/> */}
			<Footer/>
		</div>
		</div>
  )} 

  {showImprovements && (
    <>
    <div className="text-center">
    //Extras ocultos
    {/* <ToDoList/> */}
			<MyComponent/>funciona 

    {/* <VisualTodDo/> */}
    <Footer />
    </div>
    </>
  )}

</> );};

export default Home;