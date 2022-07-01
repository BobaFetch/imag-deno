/** @jsx h */
import { h } from 'preact'
import { Handlers, PageProps } from '$fresh/server.ts'
import { tw } from '@twind'

import Navigation from '../../islands/Nav.tsx'
import Table from '../../islands/Table.tsx'

interface JobList {
  Part_Ref: string;
  Part_Num: string;
  Run: string;
  Queue_Diff: number;
  Qty: number;
  Customer: string;
  Cust_Date: string;
  Priority: number;
  WC_Name: string;
  Comments: string;
  WC_Num: string;
  PO: string;
  Item: string;
}

const api = 'http://imawebrpt.imagineticsinc.local:4004/api'

export const handler:Handlers<JobList | null> = {
  async GET(_, ctx) {
    const { dept } = ctx.params;

    if (dept === "cnc") {
      const response = await fetch(`${api}/testing/cnc`);
      if (response.status === 404) {
        return ctx.render(null)
      }

      const jobs:JobList[] = await response.json()
      const deptName = "CNC"
      return ctx.render({jobs, dept, deptName})
    }
    
    const response = await fetch(`${api}/testing/dept/${dept}`);
    if (response.status === 404) {
      return ctx.render(null);
    }
    const departmentName = getDepartmentName(dept)
    const jobs:JobList[] = await response.json()
    
    if (!jobs) {
      const deptName = ""
      const jobs = []
      return ctx.render({jobs, dept, deptName})
    }
    const deptName =  "" || jobs[0].WC_Name
    return ctx.render({jobs, dept, deptName})
  }
}

function getDepartmentName(dept) {
  const department = null //todo
  return department
}

export default function Dept({data}:PageProps<JobList | null>) {
  const { jobs, dept, deptName } = data
  // console.log(data)
  if (jobs.length <= 0) {
    return (
      <div>
        <Navigation />
        <h1>No Jobs In Queue</h1>
      </div>
    )
  }


  return (
    <div class={tw`flex flex-col items-center justify-center`}>
      <Navigation />
      <h1 class={tw`text(4xl gray-600 center) p-5 w-full`}>{deptName}</h1>
      <Table parts={jobs} dept={dept} />
    </div>
  )
}
