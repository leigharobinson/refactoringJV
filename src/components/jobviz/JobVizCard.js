import React, { useState, useEffect } from "react";
import { makeUrlPath } from "../Helper";

export const JobVizCard = (props) => {
  const job = props.job;
  // console.log("ISEEEYOU", job);

  return (
    <>
      {/* <h1>HWOOWOW</h1> */}
      <div
        className="jobviz-parent-card"
        onClick={() => {
          props.history.push(`/jobviz/${job.id}/`);
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
