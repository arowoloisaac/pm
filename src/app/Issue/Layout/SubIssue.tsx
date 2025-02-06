import React, { useEffect, useState } from "react";
import { IIssue } from "../utils/utils";
import { subIssueList } from "../api-function/issue-api";

const SubIssue = () => {
  const [getSubIssues, setSubIssues] = useState<IIssue[] | any>([]);

  const fetchSubs = async () => {
    const data = await subIssueList(
      "881a3f46-050d-4449-94a2-1a8eccc4e715",
      "674f4bb4-62c8-42cc-8d7b-2dedc062d1a9"
    );

    data ? setSubIssues(data) : null;
  };
  useEffect(() => {
    fetchSubs();
  },[]);

  console.log(getSubIssues)
  return (<></>);
};

export default SubIssue;
