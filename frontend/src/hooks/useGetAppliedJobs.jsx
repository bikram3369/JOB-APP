import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;


// import { setAllAppliedJobs } from "@/redux/jobSlice";
// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAppliedJobs = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((store) => store.auth); // ✅ auth check

//   useEffect(() => {
//     // ✅ DO NOT call API if user is not logged in
//     if (!user) return;

//     const fetchAppliedJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${APPLICATION_API_END_POINT}/get`,
//           { withCredentials: true }
//         );

//         if (res.data.success) {
//           dispatch(setAllAppliedJobs(res.data.applications)); // ✅ correct key
//         }
//       } catch (error) {
//         console.log("Applied jobs error:", error.response?.status);
//       }
//     };

//     fetchAppliedJobs();
//   }, [user, dispatch]);
// };

// export default useGetAppliedJobs;
