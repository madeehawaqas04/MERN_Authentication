import React, { useState, useEffect } from 'react'
import '../styles/style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser, reset } from '../../../redux/auth/authAction';

const Login = () => {

  let dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  //using useselector for getting data from store

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.authData);

  // console.log(user);

  useEffect(() => {
    if (isError) {
      toast.error("Invalid credentials")
    }

    // console.log(user);
    if (user != null) {
      console.log(user.email);
    }

    console.log('isSuccess');
    console.log(isSuccess);
    if (isSuccess || user != null) {
      navigate('/')
    }
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const loginUser = async (e) => {
    e.preventDefault();

    try {

      if (!email || !password) {
        toast.error("Please fill the data", { position: "top-center" });
      }
      else {

        const userData = {
          email,
          password,
        }

        dispatch(signinUser(userData));
        // navigate("/User/List")
        // setTimeout(function () {
        //     toast.success("Login Successfully", { position: "top-center" });
        // }, 100);

        // const res = await fetch('http://localhost:8002/signinUser', {
        //   method: 'POST',
        //   credentials: 'include',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     email,
        //     password
        //   })
        // });

        // const data = res.json();

        // console.log(data);
        // if (res.status === 200) {
        //   toast.success("Login Successfull", { position: "top-center" });
        //    dispatch({ type: 'USER', payload: true })
        //   navigate('/');

        // } else {
        //    toast.error("Invalid Credentials", { position: "top-center" });

        // }
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error, { position: "top-center" });
    }

  }

  return (
    <>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src="/img/signin-image.jpg" alt="sing up image" /></figure>
              <NavLink to="/Signup" className="signup-image-link">Create an account</NavLink>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Login </h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label ><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="email" name="email" id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label ><i className="zmdi zmdi-lock"></i></label>
                  <input type="password" name="password" id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="form-group">
                  <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                  <label className="label-agree-term"><span><span></span></span>Remember me</label>
                </div> */}
                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className="form-submit"
                    value="Log in" onClick={loginUser} />
                </div>
              </form>
              {/* <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li><a to="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                  <li><a to="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                  <li><a to="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Login
