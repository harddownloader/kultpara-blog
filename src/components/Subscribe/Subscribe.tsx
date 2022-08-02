import React from 'react';

export const Subscribe = () => {
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          name="subscribe"
          placeholder={"Email"}
          className={"p-2 bg-white text-base text-black"}
        />
        <button
          className={"p-2 bg-black border-2 border-white text-base text-white"}
        >Subscribe</button>
      </div>
    </>
  );
};

export default Subscribe;