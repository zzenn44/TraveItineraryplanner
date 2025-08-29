// import React from "react";
// import DoughnutChart from "./Doughnut";
// import Sidebar from "../admin/Sidebar";


// const Analytics = () => {
//   const userRoles = ["Trekkers", "Guides", "Admins"];
//   const userData = [45, 10, 2];

//   const regionLabels = ["Everest", "Annapurna", "Langtang", "Dolpo"];
//   const regionData = [30, 40, 20, 10];

//   const ageGroups = ["18–25", "26–35", "36–50", "50+"];
//   const ageData = [25, 35, 15, 5];

//   const ChartCard = ({ title, labels, data }) => (
//     <div className="bg-white shadow-md rounded-lg p-6 w-[320px] md:w-[380px] flex flex-col items-center">
//       <h3 className="text-xl font-semibold text-[#4c6444] mb-4">{title}</h3>
//       <DoughnutChart labels={labels} data={data} />
//     </div>
//   );

//   return (

//    <div className="flex h-screen w-sceen flex-col">
//     <div className="fixed"><Sidebar/></div>
//     <div className="min-h-screen bg-[#f5f5f5] px-6 py-12 ml-64">
//       <h1 className="text-3xl font-bold text-center text-[#4c6444] mb-12">
//         Travel Analytics Dashboard
//       </h1>

//       <div className="flex flex-wrap justify-center gap-10">
//         <ChartCard title="User Roles in TripPal" labels={userRoles} data={userData} />
//         <ChartCard title="Popular Trekking Regions" labels={regionLabels} data={regionData} />
//         <ChartCard title="User Age Distribution" labels={ageGroups} data={ageData} />
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Analytics;
