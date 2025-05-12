import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import GetUsers from "./components/GetUser";
import Navbar from "./components/NavBar";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<AddUser/>}/>
          <Route path="/get_user" element={<GetUsers/>}/>

          {/* <Route path="/" element={<AddUser/>}></Route>
          <Route path="/get_user" element={<GetUser2/>}></Route> */}
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
