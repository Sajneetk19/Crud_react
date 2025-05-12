import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function GetUsers() {
  const [data, setData] = useState([]);
  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


const handleDelete = async (itemToDelete: number) => {
  try {
    await fetch(`http://localhost:3000/users/${itemToDelete}`, {
      method: 'DELETE',
    });
    const updatedData = data.filter((item: any) => item.id !== itemToDelete);
    setData(updatedData);
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};


   console.log("all the data ",data);
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "90%", justifySelf: "center", paddingTop: "30px" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>UserName</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Number</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any, id) => (
            <StyledTableRow key={id}>
              <StyledTableCell component="th" scope="row">
                {item.username}
              </StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.city}</StyledTableCell>
              <StyledTableCell align="right">{item.number}</StyledTableCell>
              <StyledTableCell align="right">
                <div
                  style={{ display: "flex", gap: "5px", justifyContent: "end" }}
                >
                  <div style={{ paddingRight: "8px" }}>
                    <BorderColorIcon />
                  </div>
                  <div onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </div>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
