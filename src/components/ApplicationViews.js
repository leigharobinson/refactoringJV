import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { JobVizList } from "./jobviz/JobVizList";

export const ApplicationViews = (props) => {
  const jobs = props.originalJobs;

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
          path="/jobviz/:level0"
          render={(props) => {
            return (
              <JobVizList
                jobs={jobs}
                level0={props.match.params.level0}
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/jobviz/:level0/:parent"
          render={(props) => {
            return (
              <JobVizList
                level0={props.match.params.level0}
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
