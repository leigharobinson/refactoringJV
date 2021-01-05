import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { JobVizList } from "../components/jobviz/JobVizList";
import JobManager from "../components/modules/JobManager";

export const ApplicationViews = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    JobManager.getAll().then((jobs) => {
      setJobs(jobs);
    });
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/jobs"
          render={(props) => {
            return <JobVizList jobs={jobs} {...props} />;
          }}
        />
        <Route
          exact
          path="/jobs/job-catagories"
          render={(props) => {
            return <JobVizList jobs={jobs} {...props} />;
          }}
        />
        <Route
          exact
          path="/jobs/job-catagories/:jobsId(\d+)"
          render={(props) => {
            return (
              <JobVizList
                jobsId={parseInt(props.match.params.jobId)}
                jobs={jobs}
                {...props}
              />
            );
          }}
        />
      </Switch>
    </React.Fragment>
  );
};
