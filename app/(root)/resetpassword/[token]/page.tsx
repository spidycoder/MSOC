// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// const page = ({ params }: any) => {
//   console.log("Token", params.token);

//   const token = params.token;
//   const router = useRouter();

//   const [error, setError] = useState("");
//   const [verified, setVerified] = useState(false);
//   const [user, setUser] = useState(null);


//   const { data: session, status: sessionStatus } = useSession();
//   useEffect(() => {
//     if (sessionStatus !== "authenticated") {
//       router.replace("/");
//     }
//   }, [sessionStatus, router]);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const res = await fetch("/api/verifytoken", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             token: params.token,
//           }),
//         });
//         if (res.status === 400) {
//           setError("Invalid Token or has expired");
//           setVerified(true);
//         }
//         if (res.status === 200) {
//           setError("");
//           setVerified(true);
//           const userData = await res.json();
//           console.log("UserData ", userData);
//           setUser(userData);
//         } else if (res.status === 500) {
//           setError("An error occurred on the server. Please try again.");
//         }
//       } catch (error: any) {
//         console.error(error);
//         setError("An Error Occured.Please try again");
//       }
//     };
//     verifyToken();
//   }, [params.token]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const password = e.target[0].value;
//     try {
//       const res = await fetch("/api/resetpassword", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           password,
//           //here add the email recieved from the backend
//           email: "kumaraditya767718@gmail.com",
//         }),
//       });
//       if (res.status === 200) {
//         setError("");
//         router.push("/login");
//       } else if (res.status === 400) {
//         setError("An error occurred on the server. Please try again.");
//       }
//     } catch (error: any) {
//       console.error(error);
//       setError("An Error Occured.Please try again");
//     }
//   };
//   if (sessionStatus == "loading" || !verified) {
//     return (
//       <div className="flex justify-center items-center font-semibold text-4xl ">
//         <h1>Loading...</h1>
//       </div>
//     );
//   }
//   return (
//     sessionStatus !== "authenticated" && (
//       <div className="flex flex-col min-h-screen items-center justify-between p-24">
//         <div className="bg-[#212121] p-9 rounded shadow-md w-96">
//           <h1 className="text-4xl text-center font-semibold mb-8 text-white">
//             Reset Password
//           </h1>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="" className="text-white">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               required
//               className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2 mb-2"
//             />
//             <button
//               type="submit"
//               disabled={error.length > 0}
//               className={`w-full bg-blue-500 text-white py-2 rounded ${
//                 error.length > 0 ? "cursor-not-allowed" : "hover:bg-blue-600"
//               } mt-6`}
//             >
//               Reset Password
//             </button>
//           </form>
//           <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
//           <div className="text-white">
//             Generate New Token:-
//             <Link href="/forgetpassword" className="text-blue-400 ml-2">
//               generate
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default page;
