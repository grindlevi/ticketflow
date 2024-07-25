import { useEffect, useState } from "react";

export const Test = () => {
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        async function getMessage() {
            try {
                const response = await fetch('/api/test')
                if(!response.ok){
                    throw new Error("Error")
                }

                const data = await response.text()
                setMessage(data)
            } catch (error) {
                console.error(error)
            }
        }
        getMessage()
    }, [])

    return (
        <p>{message}</p>
    )
}