'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { useSearchParams , useRouter} from 'next/navigation';
import { useEffect } from 'react';

const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect'); // Get the redirect query parameter

    useEffect(() => {
      if (redirect) {
        // Redirect the user after login is successful
        router.push(redirect as string);
      }
    }, [redirect]);
    return (
        <div>
  
            <SignedOut>
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <SignInButton>
                        <button
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                        >
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
               
            </SignedIn>
            
        </div>
    )
}

export default Login