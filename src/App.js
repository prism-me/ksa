import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./layouts/Layout";
import Navigation from "./navigator/Navigation";
import ScrollToTop from "./utils/ScrollToTop";
import ClipLoader from "react-spinners/BounceLoader";

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            className={`d-flex flex-column text-center align-items-center justify-content-center`}
            style={{
              position: "absolute",
              zIndex: 99999,
              height: "100%",
              width: "100%",
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <ClipLoader color={"#e65550"} loading={true} size={80} />
          </div>
        }
      >
        <ScrollToTop />
        <Layout>
          <Navigation />
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
