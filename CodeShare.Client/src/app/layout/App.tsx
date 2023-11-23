import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../../pages/Home";
import CodeSnippetDetail from "../../pages/CodeSnippetDetail";
import NoMatch from "../../pages/NoMatch";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="code/:id" element={<CodeSnippetDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
