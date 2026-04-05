import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { backendUrl } = useContext(AppContext)
    const [state, setState] = useState("signUp")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const formHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            if (state === "signUp") {
                const { data } = await axios.post(`${backendUrl}/auth/register`, { name, email, password })

                if (data.success) {
                    toast.success(data.message)
                    localStorage.setItem("token", data.token)
                    navigate("/exam")
                }

            } else {
                const { data } = await axios.post(`${backendUrl}/auth/login`, { email, password })

                if (data.success) {
                    toast.success(data.message)
                    localStorage.setItem("token", data.token)
                    navigate("/exam")
                } else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center mt-10'>
            <form onSubmit={formHandler} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow">

                <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
                    {state === "signUp" ? "Sign Up" : "Log in"}
                </h2>

                {
                    state === "signUp" &&
                    <input
                        className="w-full border-1 border-gray-300 p-2 mb-3 rounded"
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                }

                <input
                    className="w-full border-1 border-gray-300 p-2 mb-3 rounded"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <input
                    className="w-full border-1 border-gray-300 p-2 mb-3 rounded"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button
                    disabled={loading}
                    type='submit'
                    className="w-full mb-3 bg-indigo-500 py-2.5 rounded text-white font-medium"
                >
                    {loading ? "Please wait..." : (state === "signUp" ? "Create Account" : "Log in")}
                </button>

                {
                    state === "signUp" ?
                        <p onClick={() => setState("login")} className="text-center cursor-pointer">
                            Already have an account? <span className="text-blue-500">Log In</span>
                        </p>
                        :
                        <p onClick={() => setState("signUp")} className="text-center cursor-pointer">
                            Don't have an account? <span className="text-blue-500">Sign Up</span>
                        </p>
                }

            </form>
        </div>
    )
}

export default Login