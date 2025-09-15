import React from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FilterCard from "@/components/pagecomponents/JObpagecomponent/filtercard";
import Job from "@/components/pagecomponents/JObpagecomponent/job";
import { useSelector } from "react-redux";




const Jobs = () => {
  const { allJobs} = useSelector(store => store.job);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1 max-w-7xl mx-auto mt-5 gap-5">

        {/* Sidebar */}
        <div className="w-1/5 bg-white rounded shadow-md border border-gray-200 mb-5">
          <FilterCard />
        </div>

        {/* Job List Area */}
        <div className="flex-1 min-h-[calc(100vh-64px)] w-300 flex flex-col">

          {allJobs.length <= 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <span className="text-gray-500 text-lg">Job not found</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
              {allJobs.map((job, index) => (
                <div key={index}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Jobs;