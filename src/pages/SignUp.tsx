import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // toast.success("You've been logged in!", { autoClose: 2000 });

            // setMessage("Signup successful!");
            navigate("/", { replace: true }); // ADD replace: true

        } catch (error) {
            // setMessage(error.message);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>


                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-xl"
                            placeholder="Enter your email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded-xl"
                            placeholder="Enter your password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full p-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>


                <p className="text-center text-sm mt-4">
                    Already have an account? <a href="/Signin" className="text-blue-600">Login</a>
                </p>
            </div>
        </div>
    );
}

export default SignUp