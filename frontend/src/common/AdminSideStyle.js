import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 15px;
    }

    &::-webkit-scrollbar-track {
      background: #f0f3f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #357cd9;
      border-radius: 50px;
      border: 3px solid #f0f3f5;
    }
  }

  body{
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: #f0f3f5;
  }

`;
