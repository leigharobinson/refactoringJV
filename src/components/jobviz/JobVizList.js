import React, { useState, useEffect } from "react";
import "../styling/Style.css";

export const JobVizList = (props) => {
  const jobs = props.jobs;
  const level1 = props.level1;

  const findChildren = (parent, nodes) => {
    const children = [];
    const h = parent["Hierarchy"];
    const level = `Level${h}`;
    nodes.forEach((n) => {
      if (n["Hierarchy"] === h + 1 && parent["ttl"] === n[level]) {
        children.push(n["id"]);
      }
    });
    if (children.length !== 0) {
      console.log(
        "Level1:",
        parent.Level1,
        "Level2",
        parent.Level2,
        "Level3",
        parent.Level3,
        level,
        parent.ttl,
        children
      );
    }
    return children;
  };
  const getChildrenResulets = () => {
    jobs.forEach((job) => {
      job["children"] = findChildren(job, jobs);
    });
  };

  useEffect(() => {
    getChildrenResulets();
  }, [jobs]);

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
              props.history.push("/jobs/job-catagories");
              // console.log("you clicked me");
            }}
          >
            <div className="jobviz-parent-card">
              <div type="button" className="link-btn">
                +
              </div>

              <p>Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
