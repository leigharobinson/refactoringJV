const [updatedJobs, setUpdatedJobs] = useState([]);
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

const addChildrenToJobs = (jobs) => {
  const jobWithChildren = [];
  originalJobs.forEach((job) => {
    job["children"] = findChildren(job, originalJobs);

    // console.log(job["children"]);
    jobWithChildren.push(job);
  });
  // console.log(jobWithChildren);
  setUpdatedJobs(jobWithChildren);
};

const findParent = (job, nodes) => {
  // console.log(nodes);
  const parent = [];
  const h = job.Hierarchy;

  nodes.forEach((n) => {
    if (n.children.length !== 0 && n.Hierarchy === h - 1) {
      for (let i = 1; i <= n.children.length; i++) {
        if (n.children[i] === job.id) {
          parent.push(n.id);
        }
      }
    }
  });
  // console.log(parent);
  return parent;
};

const addParentToJobs = (updatedJobs) => {
  const jobWithParent = [];
  updatedJobs.forEach((job) => {
    job["parent"] = findParent(job, updatedJobs);

    jobWithParent.push(job);
  });
  // console.log(jobWithParent);
  setJobs(jobWithParent);
};

useEffect(() => {
  console.log("original Jobs", originalJobs);
  addChildrenToJobs(originalJobs);
}, [originalJobs]);

useEffect(() => {
  console.log("updated Jobs", updatedJobs);
  addParentToJobs(updatedJobs);
}, [updatedJobs]);
