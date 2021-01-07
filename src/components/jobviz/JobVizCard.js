import React, { useState, useEffect } from "react";
import { makeUrlPath } from "../Helper";

export const JobVizCard = (props) => {
  const job = props.job;

  const level0 = job.parent[0];
  const parent = job.id;
  // console.log(end);

  return (
    <>
      {/* <h1>HWOOWOW</h1> */}
      <div
        className="jobviz-parent-card"
        onClick={() => {
          props.history.push(`/jobviz/${level0}/${parent}`);
        }}
      >
        <div className="btn-container">
          <div type="button" className="link-btn">
            +
          </div>
        </div>
        <div id={job.id} className="listed-categories">
          {job.title}
        </div>
      </div>
    </>
  );
};
