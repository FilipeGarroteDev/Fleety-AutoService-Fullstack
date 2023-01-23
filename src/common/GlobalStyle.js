import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 15px;
    }

    &::-webkit-scrollbar-track {
      background: #544E4E;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #292727;
      border-radius: 50px;
      border: 3px solid #544E4E;
    }
  }

  body{
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: #544E4E;
    overflow: hidden;

  }

`;
