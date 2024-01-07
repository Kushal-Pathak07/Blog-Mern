import React from 'react'
import { useState, useContext } from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material'
import {API} from '../../service/api';
import logo from '../../assets/Logo.jpg';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.1);
`
const Image = styled('img')({ //styling in html tag using object
    width: 100,
    display: 'flex',
    margin: 'auto',
    paddingTop:'10px'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`
const LoginButton = styled(Button)
`
text-transform: none; 
background: #FB641B;
color: #fff;
border-radius: 2px;
`
const SignupButton = styled(Button)`
    text-transform:none;
    background: #fff;
    color: #2874f0;
    height:40px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`
const Error = styled(Typography)
`font-size: 10px;
color: #ff6161;
line-height: 0;
margin-top: 10px;
font-weight: 600;`

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const signupInitialValues = {
    name:'',
    username:'',
    password:''
}
const loginInitialValues = {
    username: '',
    password: ''
}

const Login = ({isUserAuthenticated}) => {

    const [account, setAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const {setAcc} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleAccount = () => {
        account === 'login' ? setAccount('signup') : setAccount('login');
    }

    const onChangeHandler = (e) => {
        setSignup({...signup, [e.target.name]:e.target.value}); // ...signup is storing it's previous values
    }
    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const signupUser = async () => {
        console.log(signup);
        try 
        {
          let response = await API.userSignup(signup);
          if(response.isSuccess) 
          {
            setError(' ');
            setSignup(signupInitialValues);
            setAccount('login');
          } 
          else 
          {
            setError('Something went wrong. Please try again later.');
          }
        } 
        catch(error) 
        {
          setError('Something went wrong. Please try again later.');
        }
    };

    const loginUser = async () => {
        try 
        {
          console.log(login);
          let response = await API.userLogin(login);
          console.log("Login response is :", response);
          if(response.isSuccess) 
          {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAcc({username: response.data.username, name: response.data.name});
            isUserAuthenticated(true);
            navigate('/');  
          } 
          else 
          {
            setError('Something went wrong. Please try again later.');
          }
        } 
        catch(error) 
        {
          setError('Something went wrong. Please try again later.');
        }
    };

  return (
    <Container>
        <Box>
            <Image src={logo} alt='login'/>
            {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" label="Enter username" value={login.username} name='username' onChange={(e)=>{onValueChange(e)}}/>
                            <TextField variant="standard" label="Enter Password" type='password' value={login.password} name='password' onChange={(e)=>{onValueChange(e)}}/>

                            {error && <Error>{error}</Error>}   
                            <LoginButton variant="contained"  onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleAccount()}>Create an account</SignupButton>
                        </Wrapper> 
                        :
                        <Wrapper>
                            <TextField value={signup.name} variant="standard" label="Enter Name" name='name' onChange={(e)=>{onChangeHandler(e)}}/>
                            <TextField value={signup.username} variant="standard" label="Enter Username" name='username' onChange={(e)=>{onChangeHandler(e)}}/>
                            <TextField value={signup.password} variant="standard" type='password' name='password' label="Enter Password" onChange={(e)=>{onChangeHandler(e)}}/>

                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleAccount()}>Already have an account</LoginButton>
                        </Wrapper>
                }
        </Box>
    </Container>
  )
}

export default Login;
