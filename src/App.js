import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./layouts/Layout";
import Navigation from "./navigator/Navigation";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Navigation />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
