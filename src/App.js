import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { useNetwork } from "wagmi";
import svgAvatarGenerator from "./utils/avatar";

import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import LoadingContext from "./context/loading";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("a");

  const [connectQuery, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [{ data: chainName }] = useNetwork();

  useEffect(() => {
    if (connectQuery.error?.name === "ConnectorNotFoundError") {
      //   toast.error("MetaMask extension required to sign in");
      console.log("MetaMask extension required to sign in");
    }
    if (connectQuery.data.connected && accountData) {
      let svg = svgAvatarGenerator(accountData.address, { dataUri: true });
      setAvatar(svg);
    }
  }, [connectQuery.error, connectQuery.data, accountData]);

  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Loading />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Hero
                connect={connect}
                chainName={chainName}
                connectQuery={connectQuery}
                accountData={accountData}
                disconnect={disconnect}
                avatar={avatar}
              />
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <Dashboard
                connect={connect}
                chainName={chainName}
                connectQuery={connectQuery}
                accountData={accountData}
                disconnect={disconnect}
                avatar={avatar}
              />
            }
          />
        </Routes>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
