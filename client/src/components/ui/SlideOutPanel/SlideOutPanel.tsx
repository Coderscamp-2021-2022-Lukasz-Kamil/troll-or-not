import React, { useState } from "react";
import { GameRulesTitle, TogglePanel, Rules } from "./SlideOutPanel.styled";

export const SlideOutPanel = () => {
  const [isActive, setIsActive] = useState(false);

  const togglePanel = () => {
    setIsActive(!isActive);
  };
  return (
    <TogglePanel className={isActive ? "open" : "closed"}>
      <GameRulesTitle onClick={togglePanel}>Zasady gry</GameRulesTitle>

      <Rules className={isActive ? "open" : "closed"}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
        nesciunt, voluptatibus harum error omnis minima quisquam consequuntur
        quibusdam esse eos sequi laudantium facere eum fugit iure eveniet nulla
        quas illo.
      </Rules>
    </TogglePanel>
  );
};
