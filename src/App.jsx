// import { useState } from 'react'
import './App.css'
import {useState} from "react";

function App() {
  const [jwt, setJwt] = useState('');
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function base64UrlDecode(str) {
        const padding = "=".repeat((4 - (str.length % 4)) % 4); // Add padding
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        return atob(base64 + padding);
    }


    const handleJwtChange = (e) => {
        const input = e.target.value;
        setJwt(input);

        if (!input) {
            setJwtHeader('');
            setJwtPayload('');
            setErrorMessage('');
            return;
        }

        try {
            const parts = input.split('.'); // Split the JWT into its 3 parts
            if (parts.length !== 3) {
                setErrorMessage('Invalid JWT! Please verify the three parts are present and separated by a "."');
                setJwtHeader(errorMessage);
                setJwtPayload(errorMessage);
                return;
            }

            try {
                var decodedHeader = base64UrlDecode(parts[0]);
            } catch (error) {
                setErrorMessage('Base64 decoding failed: ' + error.message);
                setJwtHeader(errorMessage);
                return;
            }
            try {
                const header = JSON.parse(decodedHeader);
                setJwtHeader(JSON.stringify(header, null, 2));
            } catch (error) {
                setErrorMessage('JSON decoding failed: ' + error.message);
                setJwtHeader(errorMessage);
            }

            try {
                var decodedPayload = base64UrlDecode(parts[1]);
            } catch (error) {
                setErrorMessage('Base64 decoding failed: ' + error.message);
                setJwtPayload(errorMessage);
                return;
            }
            try {
                const payload = JSON.parse(decodedPayload);
                setJwtPayload(JSON.stringify(payload, null, 2));
            } catch (error) {
                setErrorMessage('Failed to parse JWT payload: ' + error.message);
                setJwtPayload(errorMessage);
            }

            setErrorMessage(''); // Clear error message if parsing is successful

        } catch (error) {
            console.error('Failed to parse JWT:', error);
            setJwtHeader(errorMessage || 'Invalid JWT! Please verify the format and try again.');
            setJwtPayload(errorMessage || 'Invalid JWT! Please verify the format and try again.');
            setErrorMessage('Invalid JWT! Please verify the format and try again.');
        }
    };



    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    };



    return (
      <>
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              SIF JWT Decoder
          </h1>

          <div className="flex flex-wrap text-wrap h-screen p-2 bg-gray-100">
              <div className="flex-1 flex items-center justify-center bg-white shadow-lg rounded-lg p-6 min-w-[300px]">
                  <textarea
                      placeholder="Paste Encoded JWT..."
                      className="w-full h-19/20 p-4 border resize-none pt-[240px] border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg text-center"
                      value={jwt} onChange={handleJwtChange}
                  />
              </div>

              <div className="flex flex-col flex-1 ml-6 space-y-6">
                  <div className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 h-1/4">
                      <textarea
                          placeholder="JWT Header"
                          className="w-full h-full p-4 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-200 text-lg pt-2"
                          value={jwtHeader}
                      />
                  </div>
                  <div className="relative flex text-wrap items-center justify-center bg-white shadow-lg rounded-lg p-6 h-3/4">
                      <textarea
                          placeholder="JWT Payload"
                          className="w-full h-full p-4 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-200 text-lg pt-4"
                          value={jwtPayload}
                      />
                      <button data-copy-to-clipboard-target="npm-install-copy-button"
                              data-tooltip-target="tooltip-copy-npm-install-copy-button"
                              className="absolute end-6 top-6 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
                              onClick={() => copyToClipboard(JSON.stringify(jwtPayload, null, 2))}
                      >
                        <span id="default-icon">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                 viewBox="0 0 18 20">
                                <path
                                    d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                            </svg>
                        </span>
                      </button>
                  </div>
              </div>
          </div>
      </>
    )
}

export default App
