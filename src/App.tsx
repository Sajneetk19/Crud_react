import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import GetUsers from "./components/GetUser";
// import Day1 from "./Practise/Day1";
function App() {
  return (
    <>
       
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddUser/>}/>
          <Route path="/get_users" element={<GetUsers/>}/>
        </Routes>
      </BrowserRouter>

      {/* <Day1/> */}
    </>
  );
}

export default App;
