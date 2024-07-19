"use client";

import { getTreatmentPlans } from "@/actions/single-patient.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditTreatmentPlanForm from "@/app/dashboard/patients/[patientId]/tab-components/EditTreatmentPlan";
import PastTreamentPlans from "@/app/dashboard/patients/[patientId]/tab-components/PastTreamentPlans";
import UploadTreatmentPlan from "@/app/dashboard/patients/[patientId]/tab-components/UploadTreatmentPlan";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { ITreatmentPlan, Patient } from "@/types/backend";
import { Edit, Maximize2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import generatePDF from "react-to-pdf";

const TreatmentPlan = ({ patient }: { patient: Patient }) => {
  const [openUploadTreatmentPlan, setOpenUploadTreatmentPlan] = useState(false);
  const [openEditTreatmentPlan, setOpenEditTreatmentPlan] = useState(false);
  const [treatmentPlans, setTreatmentPlans] = useState<ITreatmentPlan[]>([]);
  const [treatmentPlan, setTreatmentPlan] = useState<ITreatmentPlan | null>(
    null
  );
  const targetPdfRef = useRef(null);

  const {
    data: treatmentPlanData,
    isLoading,
    refetch: refetchPrescriptions,
  } = useFetch<ITreatmentPlan[]>({
    queryFn: async () => getTreatmentPlans(patient._id),
    queryKey: ["patients", "treatment-plans", patient._id],
  });

  useEffect(() => {
    if (treatmentPlanData) {
      setTreatmentPlans(treatmentPlanData);
      setTreatmentPlan(null);
    }
  }, [treatmentPlanData]);

  // useEffect(() => {
  //   const generatePdf = async () => {
  //     const pdf = await generatePDF(targetPdfRef, {
  //       filename: `${treatmentPlans[treatmentPlans?.length - 1]?.treatmentPlanId}_treatment_plan.pdf`,
  //     });
  //   };

  //   generatePdf();
  // }, [treatmentPlans]);

  if (isLoading) {
    return (
      <RenderEmptyComponent>
        <ClipLoader color="#2d4763" loading={isLoading} size={25} />
      </RenderEmptyComponent>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 h-full w-full">
      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          <Maximize2 size={20} className="text-white cursor-pointer" />
          <span>Latest Treatment Plan</span>
        </h2>

        <div className="w-full h-full">
          <Image
            src="/assets/images/treatment-plan.png"
            alt="Treatment Plan"
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          Latest Treatment Plan Details
        </h2>

        {treatmentPlans.length > 0 ? (
          <div
            ref={targetPdfRef}
            className="w-full h-full bg-white flex flex-col gap-3 p-3"
          >
            <ContentHeader
              handleClick={() => {
                setTreatmentPlan(treatmentPlans[treatmentPlans.length - 1]);
                setOpenEditTreatmentPlan(true);
              }}
              title="Treatment Plan"
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
                  {treatmentPlans[treatmentPlans.length - 1].treatmentPlanId}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">Plan Name</h3>
                <p className="text-primary-gray/50 font-medium">
                  {treatmentPlans[treatmentPlans.length - 1].name}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">Start Date</h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    treatmentPlans[treatmentPlans.length - 1].startDate.split(
                      "T"
                    )[0]
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">End Date</h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    treatmentPlans[treatmentPlans.length - 1].endDate.split(
                      "T"
                    )[0]
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">Objective</h3>
                <p className="text-primary-gray/50 font-medium">
                  {treatmentPlans[treatmentPlans.length - 1].objective}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Medication Name
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {treatmentPlans[treatmentPlans.length - 1].medicationName}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Follow-up Schedule
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {treatmentPlans[treatmentPlans.length - 1].followUpSchedule}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="text-primary-green font-medium">Notes</h2>

              <div className="flex flex-col w-full">
                <p className="text-sm text-secondary-gray">
                  {treatmentPlans[treatmentPlans.length - 1].notes}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-5 text-secondary-gray">
            No treatment plans available for this patient yet!
          </p>
        )}

        <div className="flex items-center justify-end py-5 w-full">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button
              onClick={() => setOpenUploadTreatmentPlan(true)}
              className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2"
            >
              <Plus className="text-white" size={20} />
              <span className="text-sm">Upload New Plan</span>
            </Button>

            {treatmentPlans.length > 1 && (
              <PastTreamentPlans
                treatmentPlans={treatmentPlans}
                setTreatmentPlan={setTreatmentPlan}
                setOpenEditTreatmentPlan={setOpenEditTreatmentPlan}
              />
            )}
          </div>
        </div>

        <UploadTreatmentPlan
          open={openUploadTreatmentPlan}
          setOpen={setOpenUploadTreatmentPlan}
          patientId={patient._id}
          refetchTreatmentPlans={refetchPrescriptions}
        />

        <EditTreatmentPlanForm
          open={openEditTreatmentPlan}
          setOpen={setOpenEditTreatmentPlan}
          patientId={patient._id}
          refetchTreatmentPlans={refetchPrescriptions}
          treatmentPlan={treatmentPlan!}
          setTreatmentPlan={setTreatmentPlan}
        />
      </section>
    </div>
  );
};

export default TreatmentPlan;
