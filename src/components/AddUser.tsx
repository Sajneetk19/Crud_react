import { Button, Card, TextField } from "@mui/material";

function AddUser() {
  return (
    <>
      <h1>Add UserData</h1>
      <div className="mt-10">
        <Card>
        <form className="mt-10 mb-10">
          <div className="flex justify-between flex-col w-1/2 m-auto"> 
            <TextField id="filled-basic" label="userName" variant="filled" type="text"/>
            <TextField id="filled-basic" label="email" variant="filled" type="email"/>
            <TextField id="filled-basic" label="city" variant="filled" />
            <TextField id="filled-basic" label="number" variant="filled" type="number"/>
          </div>
          <div className="mt-5 ">
            <Button variant="contained" >Submit</Button>
          </div>
        </form>
        </Card>
      </div>
    </>
  );
}

export default AddUser;
