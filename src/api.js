import axios from 'axios';
 const config = {
     headers: { Authorization: `Bearer ${window.sessionStorage.getItem("jwtToken")}` }
 };


export const validateLogin = async(user) => {
    return axios.post("https://employee-api-service.herokuapp.com/user", user);
}

export const addUser = async(user) => {
    return axios.put("https://employee-api-service.herokuapp.com/user", user);
}

export const getAllEmployees = async() => {
    return axios.get("https://employee-api-service.herokuapp.com/employee",config);
}

export const registerEmployee = async(employee) => {
    return axios.put("https://employee-api-service.herokuapp.com/employee", employee, config);
}

export const updateEmployee = async(employee) => {
    return axios.patch("https://employee-api-service.herokuapp.com/employee", employee, config);
}

export const deleteEmployee = async(employeeId) => {
    return axios.delete(`https://employee-api-service.herokuapp.com/employee/${employeeId}`, config);
}

export const filterEmployee = async(filters) => {
    return axios.post("https://employee-api-service.herokuapp.com/employee", filters, config);
}