import React, { useState, useEffect } from "react";
import { JobVizCard } from "./JobVizCard";
import "../styling/Style.css";

export const JobVizList = (props) => {
  const jobs = props.jobs;
  console.log("JObs", jobs);

  const [treeRoot, setTreeRoot] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [parentId, setParentId] = useState(1);
  const [childId, setChildId] = useState(0);

  const getIdOfJob = () => {
    let i = 0;
    if (clicked === true && i === 0) {
      i += 1;
      setParentId(1);
    } else if (clicked === true && i > 0) {
      setParentId(1);
    } else {
      setParentId(0);
    }
  };

  useEffect(() => {
    setParentId(1);
  }, [parentId]);

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
          <div
            className="option"
            onClick={() => {
              if (clicked === false) {
                setClicked(true);
                getIdOfJob();
                setTreeRoot(false);
                props.history.push(`/jobviz/${jobs[0].title}`);
              } else {
                setClicked(false);
                getIdOfJob();
                setTreeRoot(true);
                props.history.push("/jobviz");
              }
            }}
          >
            <div className="jobviz-parent-card">
              <div type="button" className="link-btn">
                +
              </div>
              <p>Jobs</p>
            </div>
          </div>

          {!treeRoot ? (
            <div className="jobs-parent">
              <div className="container-cards">
                {jobs.map((child, i) => {
                  if (parentId === child.id) {
                    for (let i = 0; i <= child.children.length; i++) {
                      if (child.children[i] === child.id) {
                        return (
                          <div
                            key={i}
                            // onClick={() => setChildId(child.id)}
                            className="option"
                          >
                            <JobVizCard
                              key={child}
                              child={child}
                              jobs={jobs}
                              {...props}
                            />
                          </div>
                        );
                      }
                    }
                  }
                })}
              </div>
            </div>
          ) : (
            <div className="jobs-parent">
              <div className="container-cards"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
