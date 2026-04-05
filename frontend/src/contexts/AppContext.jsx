import { useEffect } from "react";
import { createContext } from "react";
import axios from "axios"
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");


    const getQuestions = async() => {
        try {
            setLoading(true);
            const {data} = await axios.get(`${backendUrl}/exam/getAllQuestions`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (data.success) {
                console.log(data);
                setQuestions(data.questions);
            }
        } catch (error) {
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    const value = {
        backendUrl, questions, loading, token
        
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}