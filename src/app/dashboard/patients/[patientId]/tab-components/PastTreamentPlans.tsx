"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ITreatmentPlan } from "@/types/backend";
import ContentHeader from "@/app/dashboard/health-officials/[staffId]/ContentHeader";
import { Edit, X } from "lucide-react";

type PastTreamentPlansProps = {
  treatmentPlans: ITreatmentPlan[];
  setTreatmentPlan: React.Dispatch<React.SetStateAction<ITreatmentPlan | null>>;
  setOpenEditTreatmentPlan: React.Dispatch<React.SetStateAction<boolean>>;
};

const PastTreamentPlans = ({
  treatmentPlans,
  setTreatmentPlan,
  setOpenEditTreatmentPlan,
}: PastTreamentPlansProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2">
        <span className="text-sm">View Past Plan</span>
      </DialogTrigger>
      <DialogContent
        id="hide"
        className="w-full max-w-4xl h-[90vh] overflow-y-scroll scrollbar-hide"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Past Treatment Plans (
              {treatmentPlans.slice(0, treatmentPlans.length - 1).length})
            </span>
            <DialogClose onClick={() => setTreatmentPlan(null)}>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Manage all the treament plans for this patient
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {treatmentPlans.slice(0, treatmentPlans.length - 1).map((plan) => (
            <div
              key={plan._id}
              className="w-full h-full bg-white flex flex-col gap-3 p-3"
            >
              <ContentHeader
                handleClick={() => {
                  setTreatmentPlan(plan);
                  setOpenEditTreatmentPlan(true);
                }}
                title={`Plan ${plan.treatmentPlanId}`}
              >
                <span className="text-sm text-white">Modify</span>
                <Edit className="text-white" size={20} />
              </ContentHeader>

              <div className="flex flex-col gap-2 mt-4">
                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Treatment Plan
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.treatmentPlanId}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">Plan Name</h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Start Date
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.startDate.split("T")[0]}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">End Date</h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.endDate.split("T")[0]}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">Objective</h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.objective}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Medication Name
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.medicationName}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Follow-up Schedule
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {plan.followUpSchedule}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <h2 className="text-primary-green font-medium">Notes</h2>

                <div className="flex flex-col w-full">
                  <p className="text-sm text-secondary-gray">{plan.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PastTreamentPlans;
