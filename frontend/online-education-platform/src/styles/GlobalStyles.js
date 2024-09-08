// src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, button, select {
    padding: 1.5vh 2vw;
    margin: 1vh 0.5vw;
    border-radius: 0.5vw;
    border: 1px solid #ddd;
    font-size: 1rem;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    font-size: 1rem;
  }

  button:hover {
    background-color: #0056b3;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    input, button, select {
      font-size: 0.9rem;
    }
  }
`;

export default GlobalStyle;
