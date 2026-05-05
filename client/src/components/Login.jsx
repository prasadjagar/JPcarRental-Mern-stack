import React from 'react'
import { useAppContext } from '../Context/AppContext';
import { toast } from 'react-hot-toast';
import { assets } from '../assets/assets';

const Login = ({ setShowLogin }) => {
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { axios, setToken, setUser } = useAppContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            if (state === "login") {
                const {data} = await axios.post('/api/users/login', { email, password });
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    toast.success('Login successful');
                    setShowLogin(false);
                } else {
                    toast.error(data.message);
                }
            } else {
                const {data} = await axios.post('/api/users/register', { name, email, password });
                if (data.success) {
                    toast.success('Account created successfully. Please login');
                    setState('login');
                    setName('');
                    setPassword('');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div 
            onClick={() => setShowLogin(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <form 
                onSubmit={onSubmitHandler} 
                onClick={(e) => e.stopPropagation()} 
                className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200"
            >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <button
                        type="button"
                        onClick={() => setShowLogin(false)}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                    {state === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <input 
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                                placeholder="John Doe"
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                type="text" 
                                required 
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            placeholder="your@email.com"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            type="email" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            placeholder="••••••••"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                            type="password" 
                            required 
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                    {loading ? (state === "register" ? "Creating..." : "Logging in...") : (state === "register" ? "Create Account" : "Login")}
                </button>

                {/* Toggle State */}
                <div className="text-center text-sm text-slate-600">
                    {state === "register" ? (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setState("login");
                                    setName('');
                                    setEmail('');
                                    setPassword('');
                                }}
                                className="font-semibold text-blue-600 hover:text-blue-700 transition"
                            >
                                Login here
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => {
                                    setState("register");
                                    setEmail('');
                                    setPassword('');
                                }}
                                className="font-semibold text-blue-600 hover:text-blue-700 transition"
                            >
                                Sign up here
                            </button>
                        </>
                    )}
                </div>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 border-t border-slate-200"></div>
                    <span className="text-xs text-slate-500">OR</span>
                    <div className="flex-1 border-t border-slate-200"></div>
                </div>

                {/* Info Box */}
                <div className="rounded-2xl bg-blue-50 p-4 text-xs text-slate-700">
                    <p className="font-medium text-slate-900 mb-2">Demo Credentials:</p>
                    <p>Email: <code className="bg-white px-2 py-1 rounded">demo@example.com</code></p>
                    <p>Password: <code className="bg-white px-2 py-1 rounded">password123</code></p>
                </div>
            </form>
        </div>
    )
}

export default Login