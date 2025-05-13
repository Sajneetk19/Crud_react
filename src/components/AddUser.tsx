
import { Button, Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetUsers from "./GetUser";

function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    number: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [editData, setEditData] = useState(null);

  const API_URL = "http://localhost:3000/users";

  useEffect(() => {
    if (success) {
      navigate("/get_user");
    }
  }, [success, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Method = editData ? "PUT" : "POST";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    
    const { username, email, city, number } = formData;
    if (!username || !email || !city || !number) {
      setError("All fields are required.");
      setIsPending(false);
      return;
    }

    try {
      const url = editData ? `${API_URL}/${editData}` : `${API_URL}`;

      const response = await fetch(url, {
        method: Method,
        body: JSON.stringify({ username, email, city, number }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      const data = await response.json();
      console.log("Submitted data:", data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  // console.log("form Data",formData)

  return (
    <>
      <h1>Add UserData</h1>
      <div className="mt-10">
        <Card>
          <form className="mt-10 mb-10" onSubmit={handleSubmit}>
            <div className="flex justify-between flex-col w-1/2 m-auto space-y-4">
              <TextField
                name="username"
                label="Username"
                variant="filled"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="filled"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                name="city"
                label="City"
                variant="filled"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <TextField
                name="number"
                label="Number"
                type="number"
                variant="filled"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-5 flex justify-center">
              <Button type="submit" variant="contained" disabled={isPending}>
                {editData ? "Update" : "Submit"}
              </Button>
            </div>
            {error && (
              <div className="text-red-600 text-center mt-4">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-center mt-4">
                User added successfully!
              </div>
            )}
          </form>
        </Card>
        <GetUsers setEditData={setEditData} setFormData={setFormData}/>
      </div>
    </>
  );
}

export default AddUser;
