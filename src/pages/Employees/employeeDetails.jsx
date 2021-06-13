import React, { useEffect, useState } from 'react';
import { registerEmployee, updateEmployee, deleteEmployee } from '../../api'
import './employees.scss'

const EmployeeDetails = (props) => {
    const { isEdit, employee, setIsDetailsScreen } = props;
    const [name, setName] = useState(employee?.Name || '');
    const [email, setEmail] = useState(employee?.EmailId || '')
    const [age, setAge] = useState(employee?.Age || '');
    const [address, setAddress] = useState(employee?.Address || '');
    const [phone, setPhone] = useState(employee?.MobileNumber || '');
    const [isValidForm, setValidForm] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/
        return regex.test(email);
    }

    const callRegisterApi = async (employeeDetails) => {
        if(!name || !email || !age || !address || !phone){
            setErrorMessage("All fields are mandatory")
        }
        else if (!validateEmail(email)){
            setErrorMessage("Invalid Email");
        }
        else if (age < 1 || age > 150){
            setErrorMessage("Enter an age under 150 years or greater than zero");
        }
        else if (phone.toString().length !== 10){
            setErrorMessage("Enter phone number with 10 digits");
        }
        else{
            setIsLoading(true)
            const { data } = isEdit ? await updateEmployee(employeeDetails) : await registerEmployee(employeeDetails);
            setErrorMessage(data.message);
            setIsLoading(false);
        }
    }

    const callDeleteApi = async () => {
        try{
            setIsLoading(true);
            const { data } = await deleteEmployee(employee.EmployeeId);
            setIsLoading(false);
            setErrorMessage(data.message);
        }
        catch(error){
            setErrorMessage(`Unable to delete`);
        }

    }

    const handleRegisterClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callRegisterApi({
            EmployeeId: employee?.EmployeeId,
            Name: name,
            EmailId: email,
            Age: age,
            Address: address,
            MobileNumber: phone
        })
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callDeleteApi();
    }

    const goBack = (e) => {
        setIsDetailsScreen(false)
    }

    useEffect(() => {
        if (name && email && age && address && phone) {
            setValidForm(true);
            setErrorMessage('');
        }
    }, [name, email, age, address, phone])

    return (
        <div className="container mt-5">
            {isLoading ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
                <form className="col-md-9 col-sm-12" noValidate>
                    <p className="fs-2 mb-3"> Register A New Employee</p>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" id="EmailId" value={email} onChange={e => setEmail(e.target.value)} />
                        <label className="form-label text-info">*Email id should be unique</label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" id="Age" value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" id="Address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="number" className="form-control" id="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="btn btn-secondary mb-3" onClick={handleRegisterClick} disabled={!isValidForm}>{isEdit ? "Update Employee" : "Add Employee"}</button>
                        {isEdit ? <button type="submit" className="btn btn-secondary mb-3" onClick={handleDeleteClick}>Delete Employee</button> : null}
                        <button className="btn btn-secondary mb-3" onClick={goBack}> Go Back</button>
                    </div>

                    {errMessage ? <div className={`alert alert-${errMessage.includes("successfully saved") ? 'success' : 'danger'}`} role="alert">{errMessage}</div> : null}
                </form>
            }
        </div>
    )
}

export default EmployeeDetails;