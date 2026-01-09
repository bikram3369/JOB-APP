import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDetails = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob?.applications || []),
              { applicant: user?._id },
            ],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (app) => app.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // 🔐 HARD GUARD
  if (!singleJob) {
    return (
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <p className="text-center mt-10">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />

      <div className="flex items-center justify-between mt-7 border-b pb-3">
        <div>
          <h1 className="font-bold text-xl">{singleJob.title}</h1>
          <div className="flex gap-2 mt-4">
            <Badge variant="ghost">{singleJob.position} Positions</Badge>
            <Badge variant="ghost">{singleJob.jobType}</Badge>
            <Badge variant="ghost">{singleJob.salary} LPA</Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={isApplied ? "bg-gray-500" : "bg-[#7209b7]"}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b font-medium py-4">Job Description</h1>

      <div className="my-4 space-y-2">
        <p><b>Role:</b> {singleJob.title}</p>
        <p><b>Location:</b> {singleJob.location}</p>
        <p><b>Description:</b> {singleJob.description}</p>
        <p><b>Experience:</b> {singleJob.experienceLevel} yrs</p>
        <p><b>Salary:</b> {singleJob.salary} LPA</p>
        <p><b>Total Applicants:</b> {singleJob.applications?.length}</p>
        <p>
          <b>Posted Date:</b>{" "}
          {singleJob.createdAt?.split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
