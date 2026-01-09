import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/footer";
import FilterCard from "@/components/pagecomponents/JObpagecomponent/filtercard";
import Job from "@/components/pagecomponents/JObpagecomponent/job";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Jobs = () => {
  // const { allJobs, searchedQuery } = useSelector(store => store.job);

  // useEffect(() => {
  //     if (searchedQuery) {
  //         const filteredJobs = allJobs.filter((job) => {
  //             return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
  //                 job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
  //                 job.location.toLowerCase().includes(searchedQuery.toLowerCase())
  //         })
  //         setFilterJobs(filteredJobs)
  //     } else {
  //         setFilterJobs(allJobs)
  //     }
  // }, [allJobs, searchedQuery]);
  const { allJobs, searchedQuery, filterQuery } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState([]); // Initialize as empty array

//   useEffect(() => {
//     const filteredJobs = allJobs.filter((job) => {
//       const locationQuery = filterQuery?.Location || "";
//       const industryQuery = filterQuery?.Industry || "";
//       const salaryQuery = filterQuery?.Salary || "";

//         const isSalaryMatched = () => {
//           if (salaryQuery === "") return true;

//           const salaryNumber = Number(job.salary);
//           if (isNaN(salaryNumber)) return false;

//           // salaryNumber is yearly salary in ₹

//           if (salaryQuery === "0-4lpa") {
//             return salaryNumber >= 0 && salaryNumber <= 400000;
//           }

//           if (salaryQuery === "4-10lpa") {
//             return salaryNumber > 400000 && salaryNumber <= 1000000;
//           }

//           if (salaryQuery === "10-25lpa") {
//             return salaryNumber > 1000000 && salaryNumber <= 2500000;
//           }

//           if (salaryQuery === "25-50lpa") {
//             return salaryNumber > 2500000 && salaryNumber <= 5000000;
//           }

//           return false;
//         };
      

//       return (
//         (locationQuery === "" ||
//           (job.location &&
//             job.location
//               .toLowerCase()
//               .includes(locationQuery.toLowerCase()))) &&
//         (industryQuery === "" ||
//           (job.title &&
//             job.title.toLowerCase().includes(industryQuery.toLowerCase()))) &&
//         isSalaryMatched()
//       );
//     });

//     setFilterJobs(filteredJobs);
//   }, [allJobs, filterQuery]);
useEffect(() => {
  const filteredJobs = allJobs.filter((job) => {
    const locationQuery = filterQuery?.Location || "";
    const industryQuery = filterQuery?.Industry || "";
    const salaryQuery = filterQuery?.Salary || null;

    const isSalaryMatched = () => {
      if (!salaryQuery) return true;

      const salaryLPA = Number(job.salary);
      if (isNaN(salaryLPA)) return false;

      return (
        salaryLPA >= salaryQuery.min &&
        salaryLPA <= salaryQuery.max
      );
    };

    return (
      (locationQuery === "" ||
        job.location?.toLowerCase().includes(locationQuery.toLowerCase())) &&
      (industryQuery === "" ||
        job.title?.toLowerCase().includes(industryQuery.toLowerCase())) &&
      isSalaryMatched()
    );
  });

  setFilterJobs(filteredJobs);
}, [allJobs, filterQuery]);


  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
