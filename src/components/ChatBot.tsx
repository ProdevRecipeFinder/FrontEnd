
import { Box, useColorModeValue, useBreakpointValue } from "@chakra-ui/react"
import Chat, { Message } from 'react-simple-chat'
import 'react-simple-chat/src/components/index.css'
import React, { useState } from "react"
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

const openai = new OpenAIApi(config)

const ChatBot = () => {

  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, I am your assistant Chef! I'm here to help you cook, and to answer any food or cooking related questions!",
      user: {
        id: 2,
      }
    }
  ]);

  const handleSendMessage = async (message: Message) => {
    console.log(process.env.NEXT_PUBLIC_OPENAI_KEY)
    if (!message.text)
      return

    const initPrompt =
      `The following is a conversation with an AI assistant. 
    The assistant is helpful, creative, clever, and very friendly, but only talks about food and cooking. 
    Answer all questions that are not related to food and cooking with 'I only talk about food and cooking'.
    \n\nHuman: Hello, who are you?\nAI: I am a Chef AI. How can I help you today?\n`

    const actualPrompt = `${initPrompt} ${messages.map(message => {
      if (message.user.id === 1)
        return `Human: ${message.text}\n`
      else
        return `AI: ${message.text}\n`
    })} \nHuman: ${message.text}`

    setMessages([...messages, message]);
    setTyping(true)

    const response = await openai.createCompletion("text-davinci-002", {
      prompt: actualPrompt,
      temperature: 0.9,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    })

    setTyping(false)

    //@ts-ignore
    let responseMessage = response.data.choices[0].text.replaceAll("AI:", "")

    // remove everything after "Human:"
    responseMessage = responseMessage.split("Human:")[0]

    setMessages([...messages, message, { text: responseMessage, user: { id: 2 } }])
  }

  return <React.Fragment>
    <Box color={useColorModeValue('black', 'white')}>
      <Chat
        widgetStyle={{ cursor: "pointer" }}
        minimized={true}
        title="Assistant Chef"
        user={{ id: 1 }}
        leftBubbleStyle={{ backgroundColor: '#D17B69', color: "white" }}
        headerStyle={{
          position: "absolute",
          width: "100%",
          padding: "1em",
          backgroundColor: useColorModeValue('white', '#252525'),
          boxShadow: "none",
        }}
        inputToolbarStyle={{ backgroundColor: useColorModeValue('white', '#252525') }}
        inputStyle={{ backgroundColor: useColorModeValue('white', '#252525')}}
        backgroundColor={useColorModeValue('white', '#171717')}
        containerStyle={{
          boxShadow: useColorModeValue("0px 0px 10px 0 rgba(0, 0, 0, 0.8)", "0px 0px 10px 0 rgba(255, 255, 255, 0.8)"),
          position: "fixed",
          bottom: useBreakpointValue({ base: undefined, md: "1em" }),
          right: useBreakpointValue({ base: undefined, md: "1em" }),
          borderRadius: "1em",
          zIndex: "100",
        }}
        chatIcon="./chatOpenIcon.png"
        minimizeIcon="./chatCloseIcon.png"
        isTyping={typing}
        messages={messages}
        onSend={message => handleSendMessage(message)}
      />
    </Box>
  </React.Fragment>
}

export default ChatBot