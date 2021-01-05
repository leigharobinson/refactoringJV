import React, { useState, useEffect } from "react";
import { ApplicationViews } from "./ApplicationViews";
import JobManager from "../components/modules/JobManager";

export const JobVizHost = () => {
  const [originalJobs, setOriginalJobs] = useState([]);

  useEffect(() => {
    JobManager.getAll().then((jobs) => {
      setOriginalJobs(jobs);
    });
  }, []);

  return (
    <>
      <div> Hello JobViz Host </div>
      <ApplicationViews originalJobs={originalJobs} />
    </>
  );
};
