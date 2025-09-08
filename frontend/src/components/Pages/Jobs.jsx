import React from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import FilterCard from "@/components/pagecomponents/JObpagecomponent/filtercard";
import Job from "@/components/pagecomponents/JObpagecomponent/job";

const filterJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Jobs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
    

      {/* Main content area */}
      <div className="flex flex-1 max-w-7xl mx-auto mt-5 gap-5 ">
        {/* Sidebar */}
        <div className="w-1/5 bg-white rounded shadow-md border border-gray-200">
          <FilterCard />
        </div>

        {/* Job list */}
        {filterJobs.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto pb-5">
            {/* Job cards grid */}
            <div className="grid grid-cols-3 gap-4">
              {filterJobs.map((job, index) => (
                <div key={index}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Jobs;
