import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { BG_URL } from '../utils/constants';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasword, setConfirmPassword] = useState('');
    const [signInUp, setSignInUp] = useState('');

    
    const auth = useAuth();
    const { addToast } = useToasts();
    const navigate = useNavigate();

    const getUser = {
        name: 'Test',
        email: 'test12345@gmail.com',
        password: 'test@12345',
        confirmPasword: 'test@12345'
    }

    const guestUserHandler = (event) => {
        event.preventDefault();
        setName(getUser.name);
        setEmail(getUser.email);
        setPassword(getUser.password);
        setConfirmPassword(getUser.confirmPasword)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSignInUp(true);
        
        let error = false;
        
        if(!name || !email || !password || !confirmPasword){
            addToast('Please fill all the required fields', {
                appearance: 'error',
                autoDismiss: true
            })
            error = true
        }
        
        if(password !== confirmPasword){
            addToast('Password and Confirm Password do not match', {
                appearance: 'error',
                autoDismiss: true
            })
            error = true;
        }

        if(error){
            return setSignInUp(false);
        }

        const response = await auth.signup(name, email, password, confirmPasword);
        if(response.success){
            setSignInUp(false);

            addToast('User registered Successfully', {
                appearance:'success',
                autoDismiss: true
            })
            return navigate('/login');
        }else{
            addToast(response.message, {
                appearance: 'error',
                autoDismiss: true
            })
        }

        setSignInUp(false);
    }

    if(auth.user){
        navigate('/login');
    }

    return(
        <div className=''>
            <div className='absolute'>
                <img 
                  className='h-screen w-screen object-cover'
                  src={BG_URL}
                  alt='BG-IMG'
                />
            </div>
            <form 
                className='mt-[80px] absolute left-0 right-0 w-[400px] md:w-[400px] xl:w-[400px] p-4 md:p-8 mx-auto text-white bg-blue-500 rounded-lg my-36 bg-opacity-888' 
                onSubmit={handleFormSubmit}
            >
            <h1 className='font-bold text-xl items-center m-3 p-3'>Sign Up</h1>
                <div>
                    <input
                        className='p-4 rounded-md my-2 w-full  bg-[#333333] border-b-2 border-transparent focus:border-b-2 focus:outline-0'
                        type='text'
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className='p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 border-transparent focus:border-b-2 focus:outline-0'
                        type='text'
                        placeHolder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className='p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 border-transparent focus:border-b-2 focus:outline-0'
                        type='password'
                        placeHolder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className='p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 border-transparent focus:border-b-2 focus:outline-0'
                        type='password'
                        placeHolder='Confirm Password'
                        value={confirmPasword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className='p-4 my-5 rounded-md bg-blue-800 hover:bg-[#d6180b] w-full font-medium' onClick={guestUserHandler}>
                        Add Guest Credentials
                    </button>
                </div>
                <div>
                    <button className='p-4 my-4 rounded-md bg-blue-800 hover:bg-[#d6180b] w-full font-medium' onClick={handleFormSubmit}>
                        Submit 
                    </button>
                </div>
            </form>
        </div>
    )
};


export default SignUp;
