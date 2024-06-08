import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";


const AllContact = () => {
    const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchContacts = async() => {
    try {
      const res = await fetch(`http://localhost:8000/api/mycontacts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        console.log(result);
        setContacts(result.contacts);

         setLoading(false);
      } else {
        console.log(result);
         setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
};
fetchContacts();
  }, []);
  return (
    <>
      <div>
        <h1> Your Contacts</h1>
        {loading ? <Spinner splash="Loading Contacts..."/>:(
            <table className="table table-hover">
            <thead>
              <tr className="table-light">
                <th scope="row">Name </th>
                <td>Address</td>
                <td>Email</td>
                <td>Phone</td>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                  <tr key={contact._id}>
                <th scope="row">{contact.name}</th>
                <td>{contact.address}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
              </tr> 
              ))}
              
            </tbody>
          </table>
        ) }
        
      </div>
    </>
  );
};

export default AllContact;
