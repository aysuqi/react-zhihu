import { HashRouter } from "react-router-dom";
import RouterView from "./router";
import { SafeArea } from "antd-mobile";
import { KeepAliveProvider } from "keepalive-react-component";

function App() {
  return (
    <HashRouter>
      <SafeArea position="top" />
      <KeepAliveProvider>
        <RouterView />
      </KeepAliveProvider>
      <SafeArea position="bottom" />
    </HashRouter>
  );
}

export default App;
