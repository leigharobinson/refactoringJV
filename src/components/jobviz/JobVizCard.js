import React, { useState, useEffect } from "react";
import { makeUrlPath } from "../Helper";

export const JobVizCard = (props) => {
  // const [urlTitle, setUrlTitle] = useState({});
  const child = props.child;
  // console.log(child);
  // console.log(child.parent[0]);
  // const childTitleUrl = makeUrlPath(props.child.ttl);
  // setUrlTitle(childTitleUrl);

  return (
    <>
      <div
        className="jobviz-parent-card"
        onClick={() => {
          props.history.push(`/jobviz/${child}/${child}`);
        }}
      >
        <div className="btn-container">
          <div type="button" className="link-btn">
            +
          </div>
        </div>
        <div id={child.id} className="listed-categories">
          {child.title}
        </div>
      </div>
    </>
  );
};
