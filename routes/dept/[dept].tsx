/** @jsx h */
import { h } from 'preact'
import { Handlers, PageProps } from '$fresh/server.ts'
import { tw } from '@twind'

import Navigation from '../../islands/Nav.tsx'
// import deptartmentData from '../../static/deptartment-data';

interface JobList {
  partRef: string;
  partNumber: string;
  run: string;
  queueDiff: number;
  qty: number;
  customer: string;
  schedDate: string;
  priority: number;
  workcenterName: string;
  comments: string;
  workcenterNumber: string;
  purchaseOrder: string;
  lineItem: string;
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
              <td class={tw`border border-black px-2 py-1 text-center`}>{job.Queue_Diff}</td>
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



// figure out a better idea for this shit
const departmentData = [
  {
    parent: "Assembly",
    children: [
      {
        name: "Stores ID & Issue",
        wcNumber: "0301"
      },
      {
        name: "Assembly ID & Issue",
        wcNumber: "0302"
      },
      {
        name: "Assembly",
        wcNumber: "2200"
      },
      {
        name: "Assembly Countersink",
        wcNumber: "2650"
      },
      {
        name: "Part Mark Overcoat",
        wcNumber: "5075"
      },
    ]
  },
  {
    parent: "Sheet Metal",
    children: [
      {
        name: "ID & Issue | Saw",
        wcNumber: "0300/0500"
      },
      {
        name: "Shear | Router",
        wcNumber: "0401/1400"
      },
      {
        name: "CNC Punch | AMADA 2510NT",
        wcNumber: "0700/0750"
      },
      {
        name: "Punch Press | Hydroform",
        wcNumber: "0900/1000"
      },
      {
        name: "Hot Joggle",
        wcNumber: '0950'
      },
      {
        name: "Roll Form",
        wcNumber: "1100"
      },
      {
        name: "Notcher",
        wcNumber: "1200"
      },
      {
        name: "Deburr",
        wcNumber: "1600"
      },
      {
        name: "Abrasive Blast",
        wcNumber: "5600"
      },
      {
        name: "Brake Press",
        wcNumber: "1700"
      },
      {
        name: "Straightening",
        wcNumber: "1800"
      }
    ]
  },
  {
    parent: "Inspection",
    children: [
      {
        name: "Insp Sheet Metal",
        wcNumber: "2000"
      },
      {
        name: "Insp CNC",
        wcNumber: "2005"
      },
      {
        name: "Insp Heat Treat",
        wcNumber: "2020"
      },
      {
        name: "Insp Finish",
        wcNumber: "2040"
      },
      {
        name: "Insp Prime | Topcoat",
        wcNumber: "5030/5035"
      },
      {
        name: "IMAG Cert",
        wcNumber: "5099"
      },
      {
        name: "Insp Assembly",
        wcNumber: "2050"
      },
      {
        name: "Insp Final",
        wcNumber: "2060"
      }
    ]
  },
  {
    parent: "Shipping",
    children: [
      {
        name: "Part Mark",
        wcNumber: "2300"
      },
      {
        name: "Packaging",
        wcNumber: "2400"
      }
    ]
  }
]