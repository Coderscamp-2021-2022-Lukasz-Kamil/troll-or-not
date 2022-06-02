import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   *, *:before, *:after{
   box-sizing: border-box;
   padding: 0;
   margin: 0;
   }

   body {
      font-family: 'Kaushan Script', cursive;
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
