
// import React, { useEffect, useState } from "react";
// import { ImCross } from "react-icons/im";
// import { removePageItems } from "../redux/slices/PageItems";
// import { useDispatch } from "react-redux";

// const Product = ({ post }) => {
//   const dispatch = useDispatch();
//   const [imgUrl, setImgUrl] = useState("");

//   const text = post.body;
//   const words = text.split(" ");
// const finalBody = words.slice(0, 15).join(" ");

//   useEffect(() => {
//     const generateRandomImageUrl = async () => {
//       const response = await fetch(
//         "https://source.unsplash.com/random/?sig=" + Math.random()
//       );
//       const imageUrl = response.url;
//       setImgUrl(imageUrl);
//     };

//     generateRandomImageUrl();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-between relative gap-2 p-4 mt-5 ml-5 rounded-md border bg-slate-50 shadow-md">
//       <div>
//         <p className="text-gray-800 font-semibold text-lg text-left truncate w-56 mt-1">
//           {post.title}
//         </p>
//       </div>
//       <div className="h-[20%] overflow-hidden">
//         <p className="text-gray-600 font-normal text-sm text-left">
//           {finalBody}
//         </p>
//       </div>
//       <div>
//         <p>current time</p>
//       </div>
//       <div className="h-[180px]">
//         <img src={imgUrl} className="h-full w-full object-cover" alt="" />
//       </div>

//       <button
//         className="text-red-500 absolute top-3 right-3"
//         onClick={() => dispatch(removePageItems(post.id))
//                       }
//       >
//         <ImCross />
//       </button>
//     </div>
//   );
// };

// export default Product;
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { removePageItems } from "../redux/slices/PageItems";
import { useDispatch } from "react-redux";

const Product = ({ post }) => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const text = post.body;
  const words = text.split(" ");
  const finalBody = words.slice(0, 15).join(" ");

  useEffect(() => {
    const generateRandomImageUrl = async () => {
      const response = await fetch(
        "https://source.unsplash.com/random/?sig=" + Math.random()
      );
      const imageUrl = response.url;
      setImgUrl(imageUrl);
    };

    generateRandomImageUrl();

    // Function to update the current time
    const updateCurrentTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',

      };
      const formattedTime = now.toLocaleString('en-US', options);
      setCurrentTime(formattedTime);
    };

    // Call the function initially to display the current time
    updateCurrentTime();

    // Update the current time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between relative gap-2 p-4 mt-5 ml-5 rounded-md border bg-slate-50 shadow-md">
      <div>
        <p className="text-gray-800 font-semibold text-lg text-left truncate w-56 mt-1">
          {post.title}
        </p>
      </div>
      <div className="h-[20%] overflow-hidden">
        <p className="text-gray-600 font-normal text-sm text-left">
          {finalBody}
        </p>
      </div>
      <div>
        <p className="text-gray-600 font-normal text-sm text-left">
        {currentTime}
        </p>
      </div>
      <div className="h-[180px]">
        <img src={imgUrl} className="h-full w-full object-cover" alt="" />
      </div>

      <button
        className="text-red-500 absolute top-3 right-3"
        onClick={() => dispatch(removePageItems(post.id))}
      >
        <ImCross />
      </button>
    </div>
  );
};

export default Product;
