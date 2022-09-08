import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import Navbar from '../Navbar/Navbar'
import Error from '../Error'
const Auth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isSignUp, setIsSignUp] = useState(false)

    const [errorHandler, setErrorHandler] = useState({hasError: false, message:""})

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        usernameoremail: '',
    })


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) dispatch(signup(formData, navigate, setErrorHandler))
        else dispatch(signin(formData, navigate, setErrorHandler))
    }

    const togglePassword = (e) => {
        //switches password from visible to invisible, when eye is clicked
        let pwdElem = document.querySelector('password')
        let type = pwdElem.getAttribute('type') === 'password' ? 'text' : 'password'
        pwdElem.setAttribute('type', type)
        
        this.classList.toggle('fa-eye-slash');
    }

  return (
    <>
        <Navbar />
        <div className='main'>
            <div className='screen'>
                <div className='center-view active'>
                    {isSignUp ? (
                        <div className="signupForm">
                            <form className="form" onSubmit={handleSubmit}>
                                <h1 className="title">Sign up</h1>

                                <Error errorHandler={errorHandler} />
                                
                                <div className="inputContainer">
                                    <input className="input" id="username" name="username" type="text" placeholder='a' onChange={handleChange}></input>
                                    <label for="" className="label">Username</label>
                                </div>

                                <div className="inputContainer">
                                    <input className="input" id="email" name="email" type="email" placeholder='a' onChange={handleChange}></input>
                                    <label for="" className="label">Email</label>
                                </div>

                                <div className="inputContainer">
                                    <input className="input" id="password" name="password" type="password" placeholder='a' onChange={handleChange}></input>
                                    <label for="" className="label">Password</label>
                                </div>

                                <div className="inputContainer">
                                    <input className="input" id="repeatPassword" name="repeatPassword" type="password" placeholder='a' onChange={handleChange}></input>
                                    <label for="" className="label">Repeat password</label>
                                </div>

                                <button className='btn-blue submitBtn' onSubmit={handleSubmit} type="submit">Sign up</button>
                                <p id="login-or-signup" onClick={() => setIsSignUp((prev) => (!prev))}>
                                    Already have an account? <span> Login</span>
                                </p>
                            </form>
                        </div>
                    
                    ) : (

                        <div className="signupForm">
                            <form className="form" onSubmit={handleSubmit}>
                                <h1 className="title">Login</h1>

                                <Error errorHandler={errorHandler} />

                                <div className="inputContainer">
                                    <input className="input" id="usernameoremail" name="usernameoremail" type="text" placeholder='a' onChange={handleChange}></input>
                                    
                                    <label className="label">Username or email</label>
                                </div>

                                <div className="inputContainer">
                                    <input className="input" id="password" name="password" type="password" placeholder='a' onChange={handleChange}></input>
                                    <label className="label">Password</label>
                                </div>
                                
                                
                                <button className='btn-blue submitBtn' type="submit">Login</button>

                                <p id="login-or-signup"  onClick={() => setIsSignUp((prev) => (!prev))}>
                                    Don't have an account? <span> Sign up</span>
                                </p>
                            </form>

                        </div>

                        
                    )}

                </div>
            </div>
        </div>
    </>
  )
}



export default Auth