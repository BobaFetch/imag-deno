/** @jsx h */
import { h } from 'preact'
import { useEffect, useState} from 'preact/hooks'
import { tw } from '@twind'

interface Job {
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

async function getData(dept) {
  let data:Job[]
  try {
    const res = await fetch(`http://imawebrpt.imagineticsinc.local:4004/api/testing/dept/${dept}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    if (res.ok) {
      data = await res.json();
      return data
    }
  } catch (err) {
    throw new Error(err.message())
  } 
}

export default function Table({parts, dept}) {
  const [jobs, setJobs] = useState(parts)

  useEffect(() => {
    let jobList
    setInterval(async () => {
      jobList = await getData(dept)
      setJobs(jobList)
    }, 300000)
  })
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
          {jobs.map((job:Job) => (
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

function handleTimeDifference(timeMS:number):string {
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

