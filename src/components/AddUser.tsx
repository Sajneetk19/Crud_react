"use client";

import { Button, Card, TextField } from "@mui/material";
import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type FormState = {
  success: boolean | null;
  error?: string;
};

async function AddFormData(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const city = formData.get("city") as string;
  const number = formData.get("number") as string;

  if (!username || !email || !city || !number) {
    return {
      success: false,
      error: "All fields are required.",
    };
  }

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({ username, email, city, number }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to submit form data.");
    }

    const data = await response.json();
    console.log("data", data);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An error occurred.",
    };
  }
}

function AddUser() {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    AddFormData,
    { success: null }
  );

  useEffect(() => {
    if (state.success) {
      navigate("/get_users");
    }
  }, [state.success, navigate]);

  return (
    <>
      <h1>Add UserData</h1>
      <div className="mt-10">
        <Card>
          <form className="mt-10 mb-10" action={formAction}>
            <div className="flex justify-between flex-col w-1/2 m-auto space-y-4">
              <TextField
                name="username"
                label="Username"
                variant="filled"
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="filled"
                required
              />
              <TextField name="city" label="City" variant="filled" required />
              <TextField
                name="number"
                label="Number"
                type="number"
                variant="filled"
                required
              />
            </div>
            <div className="mt-5 flex justify-center">
              <Button type="submit" variant="contained" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
            {state.error && (
              <div className="text-red-600 text-center mt-4">{state.error}</div>
            )}
            {state.success && (
              <div className="text-green-600 text-center mt-4">
                User added successfully!
              </div>
            )}
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddUser;
