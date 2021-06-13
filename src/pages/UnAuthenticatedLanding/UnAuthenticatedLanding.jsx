import React, { useEffect, useState } from 'react';
import './UnAuthenticatedLanding.scss';
import { validateLogin } from '../../actions';
import { connect } from 'react-redux';
import SignUp from '../SignUp/SignUp';


const UnAuthenticatedLanding = (props) => {
    const {
        validateLogin,
        isLoginSuccess,
        isLoading,
        jwtToken
    } = props;

    const [isValidForm, setValidForm] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, seterrMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.sessionStorage.removeItem("isLogout");
        if(!name || !password){
            seterrMessage("All Fields are mandatory");
        }
        else{
            validateLogin({
                Name: name,
                Password: password
            });
        }
        
    }

    useEffect(() => {
        if(name && password){
            setValidForm(true);
        }
    }, [name, password])

    useEffect(() => {
        const isLogout = window.sessionStorage.getItem("isLogout");
        if(!isLogout && isLoginSuccess){
            window.sessionStorage.setItem("isLoggedIn", isLoginSuccess);
            window.sessionStorage.setItem("jwtToken", jwtToken);
            props.history.push('/employees');
        }
        else if(!isLoading && !isLoginSuccess && isValidForm){
            seterrMessage('Login Failed')
        }
    }, [isLoginSuccess])


    return (
        <React.Fragment>
        <div className="formContainer col-12">
        <form className="col-md-4 col-sm-9 ">
            <p className="fs-2 mb-3"> Login</p>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="Name" value={name} onChange={e => setName(e.target.value)} required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </div>
            
            {isLoading ? <button className="btn btn-secondary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button> :
            <button type="submit" className="btn btn-secondary mb-3" onClick={handleLogin} disabled={!isValidForm}>Login</button>
             }
            {errMessage ? <div className="alert alert-danger" role="alert">{errMessage}</div> : null}
        </form>
        <SignUp></SignUp>
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    isLoginSuccess: state.isLoginSuccess,
    isLoading: state.isLoading,
    jwtToken: state.jwtToken
})

const mapDispatchToProps =  {
    validateLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(UnAuthenticatedLanding)