import React, { useState, useEffect, useRef } from "react"
import {
    Card,
    CardBody,
    Input,
    Button,
} from "@material-tailwind/react"
import { motion } from "framer-motion"


const OllamaTable = (props) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isThinking, setIsThinking] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping, isThinking])

    const sendMessage = async () => {
        if(!input.trim()) return

        const userMessage = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsTyping(true)
        setIsThinking(false)

        try {
            const response = await fetch("http://127.0.0.1:11434/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "deepseek-r1:1.5b",
                    messages: [...messages, userMessage],
                    stream: true,
                })
            })

            const reader = response.body.getReader()
            const decoder = new TextDecoder("utf-8")
            let done = false
            let messageContent = ""
            let reasoningContent = ""
            let chunks = []

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading

                const chunkContent = decoder.decode(value, { stream: true })
                const data = JSON.parse(`[${chunkContent.replace(/}{/g, "},{")}]`)
                messageContent += data.map((d) => d.message?.content).join("")

                if (chunkContent.startsWith("<think>")) {
                    setIsThinking(true)
                    reasoningContent += chunkContent.replace("<think>", "")
                } else if (chunkContent.startsWith("</think>")) {
                    setIsThinking(false)
                    reasoningContent += chunkContent.replace("</think>", "")
                } else if (isThinking) {
                    reasoningContent += chunkContent
                }
            }

            setMessages((prev) => {
                const assistantMessage = {
                    role: "assistant",
                    content: messageContent.replace(/<think>.*?<\/think>/gs, ""),
                    reasoning: reasoningContent,
                }

                return [...prev, assistantMessage]
            })

        } catch (error) {
            console.error("Error streaming response:", error)
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    return(
        <div className="flex flex-col space-y-4">
            <Card className="shadow-md max-h-[20vh] min-h-[20vh] overflow-y-auto mb-4">
                <CardBody className="space-y-3">
                    {messages.map((msg, index) => (
                        <motion.div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        >
                            <div className={`p-3 rounded-md shadow-sm max-w-[70%] ${msg.role === "user" ? "bg-blue-gray-900 text-white" : "bg-gray-100 text-black"}`}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                {msg.reasoning && (
                                    <p className="text-gray-500 text-sm mt-1">
                                        {msg.reasoning}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            className="flex justify-start"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-3 bg-gray-100 text-gray-500 rounded-md shadow-sm">
                                Typing...
                            </div>
                        </motion.div>
                    )}
                    {isThinking && (
                        <motion.div
                            className="flex justify-start"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-3 bg-gray-100 text-gray-500 rounded-md shadow-sm">
                                Thinking...
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </CardBody>
            </Card>

            <div className="flex gap-2">
                <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow"
                />
                <Button
                color="blue-gray-900"
                onClick={sendMessage}
                disabled={!input.trim()}
                className="flex items-center justify-center"
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

export default OllamaTable