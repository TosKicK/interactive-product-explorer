import ProductList from "./components/ProductList";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Segoe UI', Roboto, sans-serif;
    background-color: #f9fafb;
    color: #1f2937;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 24px 16px;

  @media (min-width: 768px) {
    padding: 40px 32px;
  }

  @media (min-width: 1200px) {
    padding: 48px 64px;
    max-width: 1300px;
    margin: 0 auto;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ProductList />
      </AppContainer>
    </>
  );
}

export default App;
