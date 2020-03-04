import React from 'react'
import { AuthenticateUser } from '../../components/Session/Form'
import { Redirect } from 'react-router-dom'
import { useSession } from '../../components/Session'
import { Link } from '../../components/UI'

export default props => {
  const [session] = useSession()

  return (
    <>
      {session ? (
        <Redirect to="/" />
      ) : (
        <div className="container mx-auto px-4 py-32 h-screen">
          <div className="w-100 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto mb-8">
            <div className="bg-primary-100 bg-teal-100 border-primary-500 border-t-4 px-4 py-3 rounded-b shadow text-teal-900">
              <div className="flex">
                <div className="px-6">
                  <p className="font-bold mb-3">Demo login</p>
                  <ul className="mb-3">
                    <li>
                      <strong>Email:</strong> demo@example.com
                    </li>
                    <li>
                      <strong>Password:</strong> 1234567
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
            <div className="bg-gray-100 px-10 pt-8 shadow-md w-full rounded-t">
              <div className="mb-6">
                <h3 className="text-gray-600">Sign in</h3>
              </div>
              <AuthenticateUser />
            </div>
            <div className="bg-gray-100 p-10 shadow-md rounded w-full mb-5">
              <hr className="mt-10 mb-3 border-t" />
              <div className="flex flex-col items-center">
                <Link to="/register" className="mb-3">
                  Sign Up
                </Link>
                <Link to="/forgot-password" className="mb-3">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
