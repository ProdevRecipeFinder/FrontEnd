import Head from 'next/head'
import { Heading, Text,Stack,Image,Center,Box,Button} from '@chakra-ui/react'
import { Input,InputGroup,InputRightElement, ButtonGroup } from "@chakra-ui/input"
import {ViewIcon,EmailIcon,DragHandleIcon} from "@chakra-ui/icons"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Password.js';


export default function Home() {
  function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Old password'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }
  
  return (
    <div >
      <Head>
        <title>Receipe Finder</title>
        <meta name="Receipe Finder" content="Uni Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
      <Box bg='gray.800' w='100%' p={2} color='white'>
        <Heading as="h1" size="lg" textAlign="center" color="white"  >Recipe Finder</Heading>
        <Image borderRadius='full' pos="absolute" top="1" right="50" boxSize='40px'src='https://bit.ly/3JmDQ4H' alt='User Profile'/>
        <DragHandleIcon pos="absolute" top="1" left="50" w={8} h={8}  />
        </Box>
      </main>

      <body >  
            <Box bg='gray.700' w='100%' p={4} color='white'>
             <Text fontSize='30px' color='whiteAlpha.900' textAlign="center"  >  Welcome,... </Text>
             <Image borderRadius='full'  boxSize='200px'  pos="absolute" top="20px" left="15%"  style={{width: "15%", height: "auto"}} src='https://bit.ly/dan-abramov' alt='Dan Abramov'/>
             </Box> 
      
      <Center bg='gray.700'>
      
      
        <Stack boxShadow="md" bg = 'gray.700' p="100" rounded="md" spacing={8} >
         
        <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type='text'
          placeholder=' Email'
        />
       
        <InputRightElement  >
        <EmailIcon w={8} h={8} color="Gray" />
        </InputRightElement>
      </InputGroup>

       
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type='text'
          placeholder='Full Name'
        />
      </InputGroup>
      
      ReactDOM.render(<PasswordInput />, document.getElementById('root'));
      ReactDOM.render(<App />, document.getElementById('root'));
      <Button colorScheme='blue'>Confirm Password</Button>
     

          
        
      
          </Stack>
        </Center>

</body>
<footer> 
</footer>
      
    </div>
  )
}
