import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { JobVizList } from "./jobviz/JobVizList";

export const ApplicationViews = (props) => {
  const originalJobs = props.originalJobs;
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
    // console.log("original Jobs", originalJobs);
    addChildrenAndParentToJobs(originalJobs);
  }, [originalJobs]);

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/jobviz"
          render={(props) => {
            return <JobVizList jobs={jobs} {...props} />;
          }}
        />
        <Route
          exact
          path="/jobviz/:parent"
          render={(props) => {
            return (
              <JobVizList
                jobs={jobs}
                parent={props.match.params.parent}
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/jobviz/:parentId(\d+)/:parent"
          render={(props) => {
            return (
              <JobVizList
                parentId={parseInt(props.match.params.parentId)}
                parent={props.match.params.parent}
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
