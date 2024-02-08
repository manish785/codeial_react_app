import {useState, useEffect} from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { BG_URL } from '../utils/constants';


const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [loginIn, setLoginIn] = useState('');
    
    const auth = useAuth();
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const getUser = {
        email: 'test12345@gmail.com',
        password: 'test@12345'
    }

    const guestUserHandler = (event) => {
        event.preventDefault();
        setEmail(getUser.email);
        setPassword(getUser.password);
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoginIn(true);

        let error = false;

        if(!email || !password){
            addToast('Please fill all the required fields', {
                appearance: 'error',
                autoDismiss: true
            })
            
            error = true
        }

        if(error){
            return setLoginIn(false);
        }

        const response = await auth.login(email, password);
        if(response.success){
            setLoginIn(false);

            addToast('User Login Successfully', {
                appearance: 'success',
                autoDismiss: true
            })
            navigate('/home-page');
        }else{
            addToast(response.message, {
                appearance: 'error',
                autoDismiss: true
            })
        }

        setLoginIn(false);
    }  

    return(
        <div className=''>
            <div className='absolute'>
                <img 
                    className='w-screen h-screen object-cover'
                    src={BG_URL}
                    alt='BG_URL'
                />
            </div>
            <form
             className='mt-[110px] absolute left-0 right-0 w-[70%] md:w-[70%] xl:w-[25%] p-4 md:p-8 mx-auto text-white bg-blue-500 rounded-lg my-36 bg-opacity-888'
             onClick={handleFormSubmit}
            >
            <h1 className='font-bold text-xl items-center m-3 p-3'>Sign In</h1>
            <div>
            <input
                className='p-4 rounded-md my-2 w-full  bg-[#333333] border-b-2 border-transparent focus:border-b-2 focus:outline-0'
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
            <input
                className='p-4 rounded-md my-2 w-full  bg-[#333333] border-b-2 border-transparent focus:border-b-2 focus:outline-0'
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button className='p-4 my-5 rounded-md bg-blue-800 hover:bg-[#d6180b] w-full font-medium' onClick={guestUserHandler}>
                    Add Guest Credentials
                </button>
            </div>
            <div>
                <button className='p-4 my-6 rounded-md bg-blue-800 hover:bg-[#d6180b] w-full font-medium' onClick={handleFormSubmit}>
                    Submit 
                </button>
            </div>
            </form>
        </div>
    )
}

export default Login;
