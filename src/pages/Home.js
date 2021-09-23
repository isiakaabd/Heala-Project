import { H1 } from "components/hooks/Texts";
import React from "react";

const DashboardHome = () => {
  return (
    <section className="max-h-screen overflow-y-auto">
      <div className="pt-10">
        <H1 color="#22202D" fontFamily="semi" className="">
          Dashboard
        </H1>
      </div>
    </section>
  );
};

export default DashboardHome;
