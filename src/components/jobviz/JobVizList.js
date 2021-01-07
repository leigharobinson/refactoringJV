import React, { useState, useEffect } from "react";
import { JobVizCard } from "./JobVizCard";
import "../styling/Style.css";

export const JobVizList = (props) => {
  const originalJobs = props.jobs;
  const location = props.location;

  // const [plus, setPlus] = useState(true);

  const [boolLevel1, setboolLevel1] = useState(false);
  const [boolLevel2, setBoolLevel2] = useState(false);
  const [parentId, setParentId] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [childrenDisplayed, setChildrenDisplayed] = useState(false);

  const [jobs, setJobs] = useState([]);

  const findChildren = (parent, nodes) => {
    const children = [];
    const h = parent.Hierarchy;
    const level = `Level${h}`;
    nodes.forEach((n) => {
      if (n.Hierarchy === h + 1 && parent.ttl === n[level]) {
        children.push(n["id"]);
      }
    });
    // console.log("children", children);
    return children;
  };

  const findParent = (job, nodes) => {
    // console.log(nodes);
    const holdParent = [];
    const h = job.Hierarchy;
    const p = h - 1;
    const level = `Level${p}`;

    nodes.forEach((n) => {
      if (n.Hierarchy === h - 1 && n.ttl === job[level]) {
        holdParent.push(n.id);
      }
    });
    // console.log(parent);
    return holdParent;
  };

  const addChildrenAndParentToJobs = (originalJobs) => {
    const jobWithChildren = [];
    const jobWithParent = [];
    originalJobs.forEach((job) => {
      job["children"] = findChildren(job, originalJobs);

      // console.log(job["children"]);
      jobWithChildren.push(job);
    });
    // console.log(jobWithChildren);
    jobWithChildren.forEach((job) => {
      job["parent"] = findParent(job, jobWithChildren);

      jobWithParent.push(job);
    });
    // console.log(jobWithParent);
    setJobs(jobWithParent);
  };

  useEffect(() => {
    // console.log(location);
    if (location.pathname === "/jobviz") {
      setChildrenDisplayed(false);
      setboolLevel1(false);
      setBoolLevel2(false);
    } else if (location.pathname === "/jobviz/1") {
      setChildrenDisplayed(true);
      setboolLevel1(true);
      setBoolLevel2(false);
    } else if (location.pathname === `/jobviz/1/${props.parent}`) {
      setChildrenDisplayed(true);
      setboolLevel1(true);
      setBoolLevel2(true);
    }

    addChildrenAndParentToJobs(originalJobs);
  }, [originalJobs, location]);

  useEffect(() => {
    // console.log(location);
    if (location.pathname === "/jobviz") {
      setParentId(0);
    } else if (location.pathname === "/jobviz/1") {
      setParentId(1);
    } else if (location.pathname === `/jobviz/1/${props.parent}`) {
      setParentId(props.parent);
    }

    addChildrenAndParentToJobs(originalJobs);
  }, []);

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
                  if (clicked) {
                    setClicked(false);
                    props.history.push("/jobviz");
                  } else {
                    setClicked(true);
                    props.history.push(`/jobviz/1`);
                  }
                }}
              >
                {/* {plus ? <div> + </div> : <div> - </div>} */}
              </div>
              <p>Jobs</p>
            </div>
          </div>
          {boolLevel1 ? (
            <div className="container-cards">
              <div className="option">
                <div className="jobviz-parent-card">
                  <div
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      if (clicked) {
                        props.history.push(`/jobviz/${jobs[0].id}`);
                      }
                    }}
                  >
                    +
                  </div>
                  <p>Job Categories</p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {boolLevel2 ? (
            <div className="container-cards">
              <div className="option">
                <div className="jobviz-parent-card">
                  <div
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      if (clicked) {
                        // setParentId(1);
                        // setChildrenDisplayed(true);
                        setClicked(true);

                        props.history.push(`/jobviz/${jobs[0].id}`);
                      } else {
                        // setParentId(0);
                        // setChildrenDisplayed(false);
                        setClicked(false);
                        props.history.push(`/jobviz/${jobs[0].id}/$`);
                      }
                    }}
                  >
                    +
                  </div>
                  <p>{props.parent}</p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {childrenDisplayed ? (
        <>
          <div className="jobs-parent">
            <div className="container-cards">
              {jobs.map((child, i) => {
                if (parentId === child.id) {
                  return (
                    <>
                      <div key={i}>
                        {jobs.map((job, k) => {
                          for (let j = 0; j <= child.children.length; j++) {
                            if (child.children[j] === job.id) {
                              return (
                                <div key={k}>
                                  <JobVizCard
                                    key={job.id}
                                    job={job}
                                    {...props}
                                  />
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
