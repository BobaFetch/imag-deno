/** @jsx h */
import { h } from 'preact'
import { Handlers, PageProps } from '$fresh/server.ts'
import { tw } from '@twind'

import Navigation from '../../../islands/Nav.tsx'
import Table from '../../../islands/Table.tsx'


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

const api = 'http://imawebrpt.imagineticsinc.local:4004/api'

export const handler:Handlers<Job>  = { 
  async GET(_, ctx) {
    const {dept1, dept2} = ctx.params;
    let jobs:Job[] = []
    const response = await Promise.all([
      fetch(`${api}/testing/dept/${dept1}`)
        .then((res) => res.json())
        .then((json) => jobs = [...jobs, json]),
      fetch(`${api}/testing/dept/${dept2}`)
        .then((res) => res.json())
        .then((json) => jobs = [...jobs, json])
    ])

    console.log(jobs)
    return ctx.render({jobs, dept1, dept2})
  }

}

export default function Department2({data}:PageProps<Job | null>) {
  const { jobs, dept1, dept2 } = data
  return (
    <div>
      <Navigation />
      <div></div>
      <div class={tw`flex`}>
        <Table parts={jobs[0]} dept={dept1} />
        <Table parts={jobs[1]} dept={dept2} />
      </div>
    </div>
  )
}

