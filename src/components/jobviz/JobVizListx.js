import React, { useState, useEffect } from "react";
import { JobVizCard } from "./JobVizCard";
import "../styling/Style.css";

export const JobVizList = (props) => {
  const [parentId, setParentId] = useState(1);
  const [clicked, setClicked] = useState(true);
  const [childrenDisplayed, setChildrenDisplayed] = useState(true);
  // const [jobs, setJobs] = useState(props.jobs);
  const jobs = props.jobs;

  // useEffect(() => {
  //   const jobs = props.jobs;
  //   setJobs(jobs);
  // }, [parentId]);

  return (
    <>
      <div className="jobviz-parent">
        <h2>Job Viz</h2>
      </div>
      <div className="jobviz-parent">
        <small>What do you want to be?</small>
      </div>
      <div className="jobviz-parent">
        <div className="container-cards">
          <div className="option">
            <div className="jobviz-parent-card">
              <div
                type="button"
                className="link-btn"
                onClick={() => {
                  if (!clicked) {
                    setParentId(1);
                    setChildrenDisplayed(true);
                    setClicked(true);
                    console.log("You !Clicked");
                    console.log(parentId, "changes to 1");
                    props.history.push(`/jobviz/${jobs[0].id}`);
                  } else {
                    console.log("You Clicked");
                    console.log(parentId, "changes to 0");
                    setParentId(0);
                    setChildrenDisplayed(false);
                    setClicked(false);
                    props.history.push("/jobviz");
                  }
                }}
              >
                +
              </div>
              <p>Jobs</p>
            </div>
          </div>
        </div>
      </div>

      {childrenDisplayed ? (
        <>
          <div className="jobs-parent">
            <div className="container-cards">
              {jobs.map((child, key) => {
                if (parentId === child.id) {
                  return (
                    <>
                      <div key={child.id}>
                        {jobs.map((job, i) => {
                          for (let j = 0; j <= child.children.length; j++) {
                            if (child.children[j] === job.id) {
                              {
                                /* console.log(job); */
                              }
                              return (
                                <div key={i}>
                                  {" "}
                                  <JobVizCard
                                    key={job.id}
                                    job={job}
                                    {...props}
                                  />{" "}
                                </div>
                              );
                            }
                          }
                        })}
                      </div>
                    </>
                  );
                  /* console.log("children", child.children); */
                }
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="jobs-parent">
            <div className="container-cards"></div>
          </div>
        </>
      )}
    </>
  );
};
