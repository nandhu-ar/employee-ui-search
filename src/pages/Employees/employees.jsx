import React, { useEffect, useState } from 'react';
import { getAllEmployees, filterEmployee } from '../../api'
import EmployeeDetails from './employeeDetails';

const Employees = (props) => {
    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isDetailsScreen, setIsDetailsScreen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(null);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(null);
    const [empid, setEmpId] = useState('');
    const getAllEmployeesDetails = async () => {
        try {
            setIsLoading(true);
            const { data } =
                await getAllEmployees()
            setEmployees(data);
            setIsLoading(false);
        }
        catch (error) {
            setEmployees([])
            setIsLoading(false);
        }
    }

    const showEditScreen = (employee) => {
        setIsEdit(true);
        setSelectedEmployee(employee);
        setIsDetailsScreen(true);
    }

    const startSearch = async () => {
        try {
            setIsLoading(true);
            const filter = {}
            if (empid) {
                filter.EmployeeId = empid
            }
            if (name) {
                filter.Name = name;
            }
            if (email) { filter.EmailId = email; }
            if (age) { filter.Age = age; }
            if (address) { filter.Address = address; }
            if (phone) { filter.MobileNumber = phone; }
            console.log("filter", filter);
            const { data } =
                await filterEmployee(filter);
            setEmployees(data);
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(!showFilter){
            getAllEmployeesDetails()
        }
    }, [showFilter])

    const LogOut = () => {
        window.sessionStorage.removeItem("isLoggedIn");
        window.sessionStorage.removeItem("jwtToken");
        window.sessionStorage.setItem("isLogout", true);
        props.history.push("/");
    }
    useEffect(() => {
        if(window.sessionStorage.getItem("isLoggedIn") && window.sessionStorage.getItem("jwtToken") ){
            setIsDetailsScreen(false);
            getAllEmployeesDetails();
        }
        else{
            LogOut();
        }
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid">

                {
                    !isDetailsScreen ?
                        isLoading ?
                            <div className="text-center mt-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            <React.Fragment>
                                <button className="mt-3 btn btn-secondary mb-3" onClick={() => setIsDetailsScreen(true)}>Add new Employee</button>
                                <button className="m-3 btn btn-secondary mb-3" onClick={() => setShowFilter(!showFilter)}> {showFilter ? "Hide Filter" : "Show Filter"}</button>
                                {showFilter ? <button className="mt-3 btn btn-info mb-3" onClick={() => startSearch()} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search works with exact match."> Search</button> : null}
                                <button className="m-3 btn btn-secondary mb-3" onClick={() => LogOut()}>LogOut</button>
                                {showFilter ? <p className="text text-info">*Search uses exact match.</p> : null}
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Employee Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email Id</th>
                                            <th scope="col">Age</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Mobile Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            showFilter ?
                                                <tr>
                                                    <td className="col"><input type="text" className="form-control" id="Address" value={empid} onChange={e => setEmpId(e.target.value)} /></td>
                                                    <td className="col"><input type="text" className="form-control" id="Address" value={name} onChange={e => setName(e.target.value)} /></td>
                                                    <td className="col"><input type="text" className="form-control" id="Address" value={email} onChange={e => setEmail(e.target.value)} /></td>
                                                    <td className="col"><input type="text" className="form-control" id="Address" value={age} onChange={e => setAge(e.target.value)} /></td>
                                                    <td className="col"><input type="text" className="form-control" id="Address" value={address} onChange={e => setAddress(e.target.value)} /></td>
                                                    <td className="col"><input type="text" className="form-control" id="Address" value={phone} onChange={e => setPhone(e.target.value)} /></td>
                                                </tr> : null
                                        }
                                        {
                                            !employees.length ?
                                                <tr>
                                                    <td colSpan="6">No Employee Details to display</td>
                                                </tr>
                                                :
                                                employees.map(employee => {
                                                    return (<tr key={employee.EmployeeId} onClick={() => showEditScreen(employee)}>
                                                        <td className="col">{employee.EmployeeId}</td>
                                                        <td className="col">{employee.Name}</td>
                                                        <td className="col">{employee.EmailId}</td>
                                                        <td className="col">{employee.Age}</td>
                                                        <td className="col">{employee.Address}</td>
                                                        <td className="col">{employee.MobileNumber}</td>
                                                    </tr>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>
                            </React.Fragment> :
                        <EmployeeDetails employee={selectedEmployee} isEdit={isEdit} setIsDetailsScreen={() => setIsDetailsScreen}></EmployeeDetails>
                }
            </div>



        </React.Fragment>
    )
}

export default Employees;