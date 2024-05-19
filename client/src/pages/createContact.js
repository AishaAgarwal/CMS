import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/toastContext";

const CreateContact = () => {
    const { user } = useContext(AuthContext);
    const {toast} = useContext(ToastContext);
    const [userdetails, setuserdetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    })
    const navigate = useNavigate();
    

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setuserdetails({...userdetails, [name] : value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:8000/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(userdetails),

        });
        const result = await res.json();

        if (!result.error){
            toast.success(`Created [${userdetails.name}] created `);
            setuserdetails({name: "", address:"", email:"", phone:""});
        }
        else{
            toast.error(result.error);
           
        }

    }
  return (
    <>
      <h2>Create your Contact</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput" className="form-label mt-4">
            Name of the Person
          </label>
          <input
            type="text"
            className="form-control"
            id="namInput"
            name="name"
            value={userdetails.name}
            onChange={handleInputChange}
            aria-describedby="nameHelp"
            placeholder="Enter the Name"
          />

          <label htmlFor="addressInput" className="form-label mt-4">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userdetails.address}
              onChange={handleInputChange}
            aria-describedby="addressHelp"
            placeholder="Enter the Current Address"
          />
        </div>

        <label htmlFor="emailInput" className="form-label mt-4">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="emailInput"
          name="email"
        value={userdetails.email}
            onChange={handleInputChange}
          aria-describedby="emailHelp"
          placeholder="Enter the Email"
        />

        <label htmlFor="phoneInput" className="form-label mt-4">
          Phone No.
        </label>
        <input
          type="number"
          className="form-control"
          id="phoneInput"
          name="phone"
            value={userdetails.phone}
            onChange={handleInputChange}
          aria-describedby="phoneHelp"
          placeholder="Enter the Contact Number"
        />
        <input type="submit" value="Add Contact" className="btn btn-info"/>
      </form>
    </>
  );
};

export default CreateContact;
