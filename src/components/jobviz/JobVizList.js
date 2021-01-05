import React, { useState, useEffect } from "react";
import "../styling/Style.css";

export const JobVizList = (props) => {
  const jobs = props.jobs;
  const [clicked, setClicked] = useState(false);
  const [parentId, setParentId] = useState(0);
  const [childrenId, setChildrenId] = useState([]);
  const [jobObj, setJobObj] = useState({
    id: 0,
    title: "",
    Hierarchy: "",
    OccupationType: "",
    Employment2016: 0,
    Employment2026: 0,
    ChgEmploy2016to26Num: 0,
    ChgEmploy2016to26Perc: 0,
    PercentSelfEmployed2016: 0,
    OccupationalOpenings2016to2026AnnualAverage: 0,
    MedianAnnualWage2017: "",
    TypicalEducationNeededForEntr: "",
    WorkExperienceInARelatedOccupation: "",
    TypicalOnTheJobTrainingNeededToAttainCompetencyInTheOccupation: "",
    ttl: "",
    Level0: "",
    Level4: "",
    Level3: "",
    Level2: "",
    Level1: "",
    pathString: "",
    Def: "",
  });

  const findId = () => {
    if (props.selectedId !== undefined) {
      setParentId(props.selectedId);
    }
  };

  const findChildren = (parent, nodes) => {
    const children = [];
    const h = parent["Hierarchy"];
    const level = `Level${h}`;
    nodes.forEach((n) => {
      if (n["Hierarchy"] === h + 1 && parent["ttl"] === n[level]) {
        children.push(n["id"]);
      }
    });
    setChildrenId(children);
    return children;
  };

  const getChildrenResulets = () => {
    jobs.forEach((job) => {
      if (job.id === parentId) {
        setJobObj(job);
        job["children"] = findChildren(job, jobs);
      }
    });
  };

  useEffect(() => {
    getChildrenResulets();
    findId();
  }, [jobs, parentId]);

  useEffect(() => {
    console.log(childrenId);
  }, [childrenId]);

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
                setParentId(1);
                props.history.push("/jobs/job-catagories");
              } else {
                setClicked(false);
                setParentId(0);
                props.history.push("/jobs");
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
        </div>
      </div>
    </>
  );
};
