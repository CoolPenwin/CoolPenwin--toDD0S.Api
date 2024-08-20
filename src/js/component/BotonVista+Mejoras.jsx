import React from "react";

const ExcuseMoi_Button = ({ currentEnvironment, toggleEnvironment }) => {
  const buttonText = {
    default: "Mostrar Mejoras",
    improvements: "Mostrar Mejoras mas molonas",
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
// import ExcuseMoi_Button from './BotonVista+Mejoras.jsx';
// import Footer from "./footer.jsx";

// const Home = () => {
//   const [currentEnvironment, setCurrentEnvironment] = useState("default");

//   const toggleEnvironment = () => {
//     const environments = ["default", "improvements", "testing"];
//     const currentIndex = environments.indexOf(currentEnvironment);
//     const nextIndex = (currentIndex + 1) % environments.length;
//     setCurrentEnvironment(environments[nextIndex]);
//   };

//   return (
//     <>
//       <ExcuseMoi_Button
//         currentEnvironment={currentEnvironment}
//         toggleEnvironment={toggleEnvironment}
//       />

//       {currentEnvironment === "default" && (
//         <div>//0
          
//           {/* Otros componentes básicos */}
//           <Footer/>
//         </div>
//       )}

//       {currentEnvironment === "improvements" && (
//         <>
//         <div>
//           //1
//         </div>
//           {/* Extras ocultos */}
          
//           <Footer />
//         </>
//       )}

//       {currentEnvironment === "testing" && (
//         <>
//           {/* Componentes de testing */}
//           <div>
//           //3
//         </div>
//           <Footer />
//         </>
//       )}
//     </>
//   );
// };

// export default Home;