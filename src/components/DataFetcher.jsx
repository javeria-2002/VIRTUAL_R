import React, { useState, useEffect } from 'react';
import './DataFetcher.css';  // Import the stylesheet

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null);  // Track which row is being edited
  const [editFormData, setEditFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});

  // Fetch data from the PHP backend
  useEffect(() => {
    fetch('http://localhost/VIRTUAL_R/fetchData.php')  // Update the URL if necessary
      .then(response => response.json())
      .then(data => {
        setData(data);  // Store fetched data
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditFormData(data[index]);  // Prefill the edit form with existing data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!editFormData.name) errors.name = 'Name is required';
    if (!editFormData.email) errors.email = 'Email is required';
    if (!editFormData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleUpdateClick = (index) => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const updatedData = [...data];
      updatedData[index] = editFormData;  // Update the selected data
      setData(updatedData);
      // Optional: If you want to update the backend, send updated data to the server here.
      setIsEditing(null);  // Exit edit mode
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  // Handle deletion of an item
  const handleDeleteClick = (id, index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // Send a request to delete the item from the backend
      fetch(`http://localhost/VIRTUAL_R/deleteData.php?id=${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            // Remove the item from the frontend state
            const updatedData = data.filter((_, i) => i !== index);
            setData(updatedData);
            alert("Item deleted successfully.");
          } else {
            alert("Failed to delete the item.");
          }
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          alert("Error deleting the item.");
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <h1 className="app-title">My Form App</h1>
      <h2>Submitted Contact Form Data</h2>
      {data.length === 0 ? (
        <p>No submissions available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.name
                  )}
                  {formErrors.name && isEditing === index && <span className="error-message">{formErrors.name}</span>}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.email
                  )}
                  {formErrors.email && isEditing === index && <span className="error-message">{formErrors.email}</span>}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      name="message"
                      value={editFormData.message}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.message
                  )}
                  {formErrors.message && isEditing === index && <span className="error-message">{formErrors.message}</span>}
                </td>
                <td>{item.timestamp}</td>
                <td>
                  {isEditing === index ? (
                    <button onClick={() => handleUpdateClick(index)}>Update</button>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)}>Edit</button>
                      <button onClick={() => handleDeleteClick(item.id, index)}>Delete</button>  {/* Add delete button */}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataFetcher;
