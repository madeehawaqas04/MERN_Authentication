import React, { useState, useEffect } from 'react'
// import '../styles/style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, reset } from '../../../redux/auth/authAction';


const Signup = () => {

  const [user, setUser] = useState({
    name: '', email: '', phone: '', work: '', password: '', cpassword: ''
  })

  const [FormError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  let dispatch = useDispatch();
  const navigate = useNavigate();


  //using useselector for getting data from store
  //const { isLoading, isError, isSuccess, message } = useSelector(state => state.authData);


  let name, value;
  const handleInputs = (e) => {
    console.log(e.target);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }

  // const PostData = async () => {
  //   //e.preventDefault();
  //   const { name, email, phone, work, password, cpassword } = user;

  //   if (!name || !email || !phone || !work || !password || !cpassword) {
  //     toast.error("Please fill all fields", { position: "top-center" });
  //   }
  //   else {

  //     dispatch(signupUser(user));
  //   }
  // }

  const PostDataAxios = async () => {
    // e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    axios.post('/register', user)
      .then((resp) => {
        console.log("resp", resp);
        setTimeout(function () {
              toast.success("Registration Successfully", { position: "top-center" });
          }, 100);
        navigate('/login')
      }).catch((error) => {
        console.log(error);
        toast.error("Invalid Registration", { position: "top-center" });
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(user));
    setIsSubmit(true);

    if (Object.keys(FormError).length === 0 && isSubmit) {
      //PostData(e);
      console.log(user);
    }

  }


  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!values.name) {
      errors.name = 'Username is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    }
    else if (!regex.test(values.email)) {
      errors.email = 'Invalid email!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    }
    else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    }

    if (!values.cpassword) {
      errors.cpassword = 'Confirm Password is required!';
    } else if (values.cpassword != values.password) {
      errors.cpassword = 'Password and confirm password must be same';
    }

    if (!values.work) {
      errors.work = 'Work is required!';
    }

    if (!values.phone) {
      errors.phone = 'Phone is required!';
    }
    return errors
  };

  useEffect(() => {
    console.log(FormError);
    if (Object.keys(FormError).length === 0 && isSubmit) {
      PostDataAxios();
      console.log(user);
    }

    // console.log('isSuccess');
    // console.log(isSuccess);
    // if (isError) {
    //   toast.success(user)
    //   toast.error(message)
    // }

    // if (isSuccess) {
    //   toast.success("Registration Successful", { position: "top-center" });
    //   navigate('/Login');


    // }

    // dispatch(reset())

  }, [FormError])


  return (
    <>
      <section className="signup">
        {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form onSubmit={handleSubmit} className="register-form" id="register-form">
                <div className="form-group">
                  {/* <label><i className="zmdi zmdi-account material-icons-name"></i></label> */}
                  <input type="text" name="name" id="name"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />

                  <p className='lblerror'>{FormError.name}</p>
                </div>
                <div className="form-group">
                  {/* <label ><i className="zmdi zmdi-email"></i></label> */}
                  <input type="email" name="email" id="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email" />

                  <p className='lblerror'>{FormError.email}</p>
                </div>

                <div className="form-group">
                  {/* <label ><i className="zmdi zmdi-phone"></i></label> */}
                  <input type="number" name="phone" id="phone"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone" />

                  <p className='lblerror'>{FormError.phone}</p>
                </div>
                <div className="form-group">
                  {/* <label ><i className="zmdi zmdi-slideshow"></i></label> */}
                  <input type="work" name="work" id="work"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Work" />
                
                <p className='lblerror'>{FormError.work}</p>
                </div>
                <div className="form-group">
                  {/* <label><i className="zmdi zmdi-lock-outline"></i></label> */}
                  <input type="password" name="password" id="password"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Password" />

                  <p className='lblerror'>{FormError.password}</p>
                </div>
                <div className="form-group">
                  {/* <label ><i className="zmdi zmdi-lock-outline"></i></label> */}
                  <input type="password"
                    name="cpassword" id="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your password" />

                  <p className='lblerror'>{FormError.cpassword}</p>
                </div>
                {/* <div className="form-group">
                  <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                  <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                </div> */}
                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit"
                    value="Register"
                  />
                </div>
                {/* onClick={PostData} */}
                {/* <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit"
                    value="Register"
                    onClick={PostDataAxios} />
                </div> */}

              </form>
            </div>
            <div className="signup-image">
              <figure><img src="/img/signup-image.jpg" alt="sing up image" /></figure>
              <NavLink to="/Login" className="signup-image-link">I am already member</NavLink>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Signup
