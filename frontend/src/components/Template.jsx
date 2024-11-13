import React from "react";
import UserIcon from "./user.png";
const Template = ({ userState, offers, answer, children }) => {
  const [userChoises, setUserChoises] = userState;

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
              value={userChoises.userName}
              onChange={(e) =>
                setUserChoises({
                  ...userChoises,
                  userName: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex flex-wrap border-gray-200 rounded">
            <div className="flex items-center ps-4 border">
              <input
                onChange={() =>
                  setUserChoises({
                    ...userChoises,
                    withAudio: !userChoises.withAudio,
                  })
                }
                id="bordered-checkbox-1"
                type="checkbox"
                value={userChoises.withAudio}
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-checkbox-1"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
              >
                Avec le son
              </label>
            </div>
            <div className="flex items-center ps-4 border">
              <input
                id="bordered-checkbox-2"
                type="checkbox"
                onChange={() => {
                  setUserChoises({
                    ...userChoises,
                    isScreenShare: !userChoises.isScreenShare,
                  });
                }}
                value={userChoises.isScreenShare}
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-checkbox-2"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
              >
                Screen Share
              </label>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">
            User: {userChoises.userName}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
