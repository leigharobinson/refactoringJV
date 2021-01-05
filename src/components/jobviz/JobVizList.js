import React, { useState, useEffect } from "react";
import { JobVizCard } from "./JobVizCard";
import "../styling/Style.css";

export const JobVizList = (props) => {
  const jobs = props.jobs;

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
              <div type="button" className="link-btn">
                +
              </div>
              <p>Jobs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-parent"> </div>
      <div className="container-cards">
        {jobs.map((child, i) => {
          if (1 === child.id) {
            return (
              <>
                <div key={child.id}>
                  {jobs.map((job, j) => {
                    for (let j = 0; j <= child.children.length; j++) {
                      if (child.children[j] === job.id) {
                        console.log(job);
                        return (
                          <div key={j}>
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
        ;
      </div>
    </>
  );
};
