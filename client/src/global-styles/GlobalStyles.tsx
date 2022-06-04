import { createGlobalStyle } from "styled-components";
import background from "../assets/background.svg";

const GlobalStyles = createGlobalStyle`
   *, *:before, *:after{
   box-sizing: border-box;
   padding: 0;
   margin: 0;
   }

   body {
      font-family: 'Kaushan Script', cursive;
      background-image: url(${background});
      background-repeat: no-repeat;
      background-size: cover;
      min-height: 100vh;
      width: 100vw;
      background-position: 100%;
      color: ${({ theme }) => theme.colors.common.textColor};

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
         -webkit-appearance: none;
         margin: 0;
      }
      input[type=number]{
         -moz-appearance: textfield;
      }

   }
`;

export default GlobalStyles;
