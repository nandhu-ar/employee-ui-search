import axios from 'axios';
 const config = {
     headers: { Authorization: `Bearer ${window.sessionStorage.getItem("jwtToken")}` }
 };


export const validateLogin = async(user) => {
    return axios.post("http://localhost:8080/user", user);
}

export const addUser = async(user) => {
    return axios.put("http://localhost:8080/user", user);
}

export const getAllEmployees = async() => {
    return axios.get("http://localhost:8080/employee",config);
}

export const registerEmployee = async(employee) => {
    return axios.put("http://localhost:8080/employee", employee, config);
}

export const updateEmployee = async(employee) => {
    return axios.patch("http://localhost:8080/employee", employee, config);
}

export const deleteEmployee = async(employeeId) => {
    return axios.delete(`http://localhost:8080/employee/${employeeId}`, config);
}

export const filterEmployee = async(filters) => {
    return axios.post("http://localhost:8080/employee", filters, config);
}