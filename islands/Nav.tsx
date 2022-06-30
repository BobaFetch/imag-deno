/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
// import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";


export default function Navigation() {
  const menuShow = tw`flex flex-col absolute bg-gray-600 text-gray-300 p-2 rounded-br-lg`
  const menuHidden = tw`hidden z-2`
  const [menuIndex, setMenuIndex] = useState(null)
  return (
    <div class={tw`text-white bg-gray-600 w-full flex flex-col items-around`}>
      <div class={tw`flex items-center justify-between p-2`}>
        <h1 class={tw`text(5xl)`}>{title}</h1>
        <input type="text" placeholder="Search Parts" class={tw`p-1 rounded`} />
      </div>
      <div class={tw`flex items-center justify-around p-2`}>
        {departmentData.map((department, i) => (
          <div 
            onMouseEnter={() => setMenuIndex(i)}
            onMouseLeave={() => setMenuIndex(null)}
          >
            <h5 class="dropdown-btn">{department.parent}</h5>
            <ul class={i === menuIndex ? menuShow : menuHidden}>
              {department.children.map((child) => (
                <li class={tw`hover:text-white`}><a href={`/dept/${child.wcNumber}`}>{child.name}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

const title = 'DEV SERVER'

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
    parent: "Machine Shop",
    children: [
      {
        name: "All",
        wcNumber: "cnc"
      },
      {
        name: "VF1 3-Axis",
        wcNumber: "0611"
      },
      {
        name: "VF2 3-Axis",
        wcNumber: "0600"
      },
      {
        name: "VF6 3-Axis",
        wcNumber: "0603"
      },
      {
        name: "VF6 5-Axis",
        wcNumber: "0640"
      },
      {
        name: "VF7 3-Axis",
        wcNumber: "0607"
      },
      {
        name: "VF10 3-Axis",
        wcNumber: "0605"
      },
      {
        name: "VF10 4-Axis",
        wcNumber: "0625"
      },
      {
        name: "VX-1000 3-Axis",
        wcNumber: "0604"
      },
      {
        name: "VX-1500 4-Axis",
        wcNumber: "0624"
      },
      {
        name: "EC 400 Horizontal",
        wcNumber: "0630"
      },
      {
        name: "EC 400 Pallet Pool",
        wcNumber: "0631"
      },
      {
        name: "Mori Seki 3-Axis",
        wcNumber: "00602"
      },
      {
        name: "Okuma MB 5000",
        wcNumber: "0632"
      },
      {
        name: "Okuma 5-Axis",
        wcNumber: "0642"
      },
      {
        name: "Manual Milling",
        wcNumber: "0800"
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