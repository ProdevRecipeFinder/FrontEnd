import { Center } from '@chakra-ui/react';
import React from 'react';
import { LoginComponent } from '../components/pageHandlers/loginComponent';
import Head from 'next/head'


const Login = () => (
    <React.Fragment>
         <Head>
        <title>Login - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Login Page" />
        </Head>

        <Center>
            <LoginComponent />
        </Center>
    </React.Fragment>
);

export default Login;