import React from "react";
import UserIcon from "./user.png";
const Template = ({ userState, offers, answer, children }) => {
  const [userName, setUserName] = userState;

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 p-4 text-white">
        <h2 className="text-xl font-bold mb-4">Personnes</h2>
        <ul>
          {offers.map((offer, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 mb-2 bg-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                <img src={UserIcon} className="w-6 h-6" />
                <span className="ml-3 text-white font-medium">
                  {offer.offererUserName}
                </span>
              </div>
              <button
                onClick={() => answer(offer)}
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
              >
                Answer
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow p-4">
        <div className="flex flex-col items-center p-4">
          <div className="w-full max-w-lg p-2 mb-4 rounded-md bg-gray-100 shadow-md">
            <input
              className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 invalid:ring-red-500"
              placeholder="Choisir un username : By default Guest"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">User: {userName}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
