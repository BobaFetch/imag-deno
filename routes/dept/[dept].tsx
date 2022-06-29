/** @jsx h */
import { h } from 'preact'
import { Handlers, PageProps } from '$fresh/server.ts'
import { tw } from '@twind'

import Navigation from '../../islands/Nav.tsx'

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
    const deptName = jobs[0].WC_Name
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
  if (!jobs) {
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
      <Table jobs={jobs} />
    </div>
  )
}

function Table({jobs}) {
  // console.log(jobs)
  return (
    <div>
      <table class={tw`border border-black`}>
        <thead>
          <tr class={tw`bg-red-300`}>
            <th class={tw`border border-black p-2 font-bold`}>Part Number</th>
            <th class={tw`border border-black p-2 font-bold`}>Run</th>
            <th class={tw`border border-black p-2 font-bold`}>Time In Queue</th>
            <th class={tw`border border-black p-2 font-bold`}>Quantity</th>
            <th class={tw`border border-black p-2 font-bold`}>Customer</th>
            <th class={tw`border border-black p-2 font-bold`}>OP Schedule Date</th>
            <th class={tw`border border-black p-2 font-bold`}>Priority</th>
            <th class={tw`border border-black p-2 font-bold`}>Comments</th>
          </tr>
        </thead>
        <tbody class={tw`bg-white`}>
          {jobs.map((job) => (
            <tr>
              <td class={tw`border border-black px-2 py-1`}>{job.Part_Num}</td>
              <td class={tw`border border-black px-2 py-1 text-center`}>{job.Run}</td>
              <td class={tw`border border-black px-2 py-1 text-center`}>{handleTimeDifference(job.Queue_Diff)}</td>
              <td class={tw`border border-black px-2 py-1 text-center`}>{job.Qty}</td>
              <td class={tw`border border-black px-2 py-1 text-center`}>{job.Customer}</td>
              <td class={tw`border border-black px-2 py-1 text-center`}>{new Date(job.Cust_Date).toLocaleDateString()}</td>
              <td class={tw`border border-black px-2 py-1 text-center`}>{job.Priority}</td>
              <td class={tw`border border-black px-2 py-1`}>{job.Comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function handleTimeDifference(timeMS) {
  const days = Math.floor(timeMS / 1440);
  const hours = Math.floor(timeMS / 60);
  const mins = timeMS % 60;
  let diff = "";

  if (days > 0) {
    diff += days === 1 ? `${days} day` : `${days} days`;
    return diff
  } else if (hours > 0) {
    diff += hours === 1 ? `${hours} hour` : `${hours} hours`;
    return diff
  }
  return mins === 0 ? `${mins} minute` : `${mins} minutes`
}



