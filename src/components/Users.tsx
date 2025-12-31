import { useEffect, useState } from "react";
import "../styles/Users.css";
interface users {
  first_name: string;
  last_name: string;
  age: number;
  gender: "male" | "female";
  hidden: boolean;
}
export default function Users() {
  const [listOfUsers, setListOfUsers] = useState<users[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const clearDataForHiddenRows = () => {
    const timeout = setTimeout(() => {
      setListOfUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          hidden: !user.first_name

            .toLowerCase()
            .startsWith(searchValue.toLowerCase()),
        }))
      );
      clearTimeout(timeout);
    }, 300);
  };
  useEffect(clearDataForHiddenRows, [searchValue]);
  // fetching
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setListOfUsers(data);
        console.log("hel", data);
      } catch {
        // alert("Not Connected To Database");
        setStatus(false);
        console.log("Not Connected To Database");
      }
    };
    fetching();
  }, []);

  return (
    <>
      {status ? (
        listOfUsers.length ? (
          <div className="user-container">
            <div className="search-box-container">
              <input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value.toLowerCase());
                }}
                type="text"
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Sex</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {listOfUsers.map(
                  (user, index) =>
                    !user.hidden && (
                      <tr
                        key={index}
                        className={
                          user.first_name.toLowerCase().startsWith(searchValue)
                            ? ""
                            : "hidden"
                        }
                      >
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="error-message">
            <strong>Error: </strong> No Users Found!{" "}
          </div>
        )
      ) : (
        <div className="error-message">
          <strong>Error:</strong> Something went wrong. Please try again later.
        </div>
      )}
    </>
  );
}
