import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllContact = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchState] = useState("");
  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
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

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        console.log(`Deleting contact with id: ${id}`);
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        console.log("Delete response:", result);
        if (!result.error) {
          setContacts(result.myContacts);
          setShowModal(false);
        } else {
          console.log(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const newSearchUser = contacts.filter((contact) => {contact.name.toLowerCase().includes(searchInput.toLowerCase())}

  )
  setContacts(newSearchUser);
  }

  return (
    <>
      <div>
        <h1>Your Contacts</h1>
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <h3>No contacts created yet</h3>
            ) : (
              <>
              <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                  type="text"
                  name="SearchInput"
                  id="searchInput"
                  className="form-control"
                  placeholder="search-contact"
                  value={searchInput}
                  onChange={(e) => setSearchState(e.target.value)}
                />
                <input type="submit" value="Search" className="btn btn-info bt-md"></input>
              </form>
              
                <p className="text-muted">Your total contacts: {contacts.length}</p>
              </>
            )}
            <table className="table table-hover">
              <thead>
                <tr className="table-light">
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    onClick={() => {
                      setModalData(contact);
                      setShowModal(true);
                    }}
                  >
                    <td>{contact.name}</td>
                    <td>{contact.address}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>

          <button className="btn btn-danger" onClick={() => deleteContact(modalData._id)}>
            Delete
          </button>

          <button className="btn btn-warning" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;
