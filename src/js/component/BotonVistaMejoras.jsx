import React from "react";

const ExcuseMoi_Button = ({ currentEnvironment, toggleEnvironment }) => {
  const buttonText = {
    default: "Mostrar Mejoras",
    improvements: "Mostrar Testing",
    testing: "Mostrar Default"
  };

  return (
    <button className="excuse-moi" onClick={toggleEnvironment}>
      {buttonText[currentEnvironment]}
    </button>
  );
};

export default ExcuseMoi_Button;

//  -------- CSS--------

//     .excuse-moi{
//   position: fixed;
//   top: 10px;
//   right: 10px;
//   z-index: 1000;
// }

//    ------- HOME -------

// import React, { useState } from "react";
// import ExcuseMoi_Button from './BotonVistaMejoras.jsx';

// Home = () => {
// const [showImprovements, setShowImprovements] = useState(false);
// const toggleImprovements = () => {
//  return (
//   setShowImprovements(!showImprovements);}

//   <>
//   <ExcuseMoi_Button  // boton siempre visible
//   showImprovements={showImprovements}
//   toggleImprovements={toggleImprovements}
//   />

//  {!showImprovements && ( //esto se muestra por defecto y se oculta al presionar boton
//   <div>
//     <componente principal />
//     {/* Otros componentes básicos */}
//     </div>
//   )} 

//   {showImprovements && (  //esto esta oculto por defecto y se muestra al presionar boton
//     <>
//     //Extras ocultos
//     <componente con extras />
//     <otros extras />
//     <Footer />
//     </>
//   )}

// </>
// );
// };

// export default Home;






import React, { useState } from "react";
import ExcuseMoi_Button from './BotonVistaMejoras.jsx';

const Home = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState("default");

  const toggleEnvironment = () => {
    const environments = ["default", "improvements", "testing"];
    const currentIndex = environments.indexOf(currentEnvironment);
    const nextIndex = (currentIndex + 1) % environments.length;
    setCurrentEnvironment(environments[nextIndex]);
  };

  return (
    <>
      <ExcuseMoi_Button
        currentEnvironment={currentEnvironment}
        toggleEnvironment={toggleEnvironment}
      />

      {currentEnvironment === "default" && (
        <div>
          <componente principal />
          {/* Otros componentes básicos */}
        </div>
      )}

      {currentEnvironment === "improvements" && (
        <>
          {/* Extras ocultos */}
          <componente con extras />
          <otros extras />
          <Footer />
        </>
      )}

      {currentEnvironment === "testing" && (
        <>
          {/* Componentes de testing */}
          <componente de testing />
          <otros componentes de testing />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;