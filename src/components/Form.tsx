import { useState } from "react";

interface Inputvals {
  first_name: string;
  last_name: string;
  age: number | null;
  gender: "male" | "female" | "";
}

export default function Form() {
  const initialState: Inputvals = {
    first_name: "",
    last_name: "",
    age: null,
    gender: "",
  };

  const [inputVals, setInputVals] = useState<Inputvals>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value =
      name === "age"
        ? e.target.value
          ? parseInt(e.target.value)
          : null
        : e.target.value;

    setInputVals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // http://localhost:5000/submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // to prevent the default behaviour of form to reload when sending a post http request.
    const formData = { ...inputVals };
    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data);
      })
      .catch((err) => console.log(`Error:${err}`))
      .finally(() => setInputVals(initialState));
  };

  return (
    <>
      <div className="main" style={{ position: "relative" }}>
        <form onSubmit={handleSubmit} method="POST">
          {/* First-name */}
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={inputVals.first_name}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
          {/* Last-name */}
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={inputVals.last_name}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />

          {/* Age */}
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            value={inputVals.age !== null ? inputVals.age : ""}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
          {/* Gender */}
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={inputVals.gender}
            onChange={handleChange}
            id="gender"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
