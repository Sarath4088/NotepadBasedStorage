import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: ''
    });
    const [records, setRecords] = useState([]);
    const [phoneError, setPhoneError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        
        if (id === "phone") {
            if (!/^[0-9]*$/.test(value)) {
                setPhoneError("Only numbers are allowed");
                return;
            } else if (value.length > 10) {
                setPhoneError("Phone number must be 10 digits");
                return;
            } else {
                setPhoneError("");
            }
        }

        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            setPhoneError("Phone number must be 10 digits");
            return;
        }
        const newRecords = [...records, formData];
        setRecords(newRecords);
        setFormData({ firstName: '', lastName: '', email: '', address: '', phone: '' });
    };

    const handleDelete = (index) => {
        const newRecords = records.filter((_, i) => i !== index);
        setRecords(newRecords);
    };

    const handleEdit = (index) => {
        setFormData(records[index]);
        handleDelete(index);
    };

    const saveToFile = () => {
        const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'records.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mt-4">
            <h1 className='text-center'>User Data</h1>
            <form className="border p-4 rounded" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} required />
                    <span className="text-danger">{phoneError}</span>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button type="button" className="btn btn-success m-2" onClick={saveToFile}>Save to Notepad</button>
                </div>
            </form>

            <div className="mt-4">
                <h4 className='text-center'>Records</h4>
                 <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-light">
                            <tr>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td>
                                        <p><strong>First Name:</strong> {record.firstName}</p>
                                        <p><strong>Last Name:</strong> {record.lastName}</p>
                                        <p><strong>Email:</strong> {record.email}</p>
                                        <p><strong>Address:</strong> {record.address}</p>
                                        <p><strong>Phone:</strong> {record.phone}</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Form;
