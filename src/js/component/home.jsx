import React, { useState } from "react";
import ExcuseMoi_Button from "./BotonVista+Mejoras.jsx";
import OseaVisualTodDo from "./userGayer.jsx";
import MyComponent from "./user+userlist.jsx";
import Footer from "./footer.jsx";
import SuperVisualTodDo from "./userUpgradeGayer.jsx";

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
        <div className="text-center">
          // gayer list
          <OseaVisualTodDo />
          {/* Otros componentes básicos */}
          <Footer />
        </div>
      )}

      {currentEnvironment === "improvements" && (
        <>
          <div className="text-center">
            // upgrade gayer list
            <SuperVisualTodDo/>
          </div>
          
          {/* Extras ocultos */}
          <Footer />
        </>
      )}

      {currentEnvironment === "testing" && (
        <>
          {/* Componentes de testing */}
          <div>//3 haker
          <MyComponent/>funciona 

          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
