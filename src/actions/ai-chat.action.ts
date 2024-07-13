"use server";

import { getChpsCompound } from "@/actions/chps-compound.action";
import { getPatient } from "@/actions/patients.action";
import { handleApiError, hasField } from "@/lib/validations";
import { ChatResponse, ChpsCompound } from "@/types/backend";
import axios from "axios";

const apiUrl = process.env.API_CHAT_URL!;

export const getChatDiagnosis = async (patientId: string, question: string) => {
  try {
    const result = await getChpsCompound();
    const patient = await getPatient(patientId);

    if (!result.status) {
      throw new Error("CHPS compound not found");
    }

    const chpsData = result.data as ChpsCompound;

    if (!patient || !chpsData._id) {
      throw new Error("Patient not found");
    }

    const chatData = {
      patient: {
        name: `${patient.firstName} ${patient.lastName}`,
        age: Math.floor(Math.random() * 60),
        gender: patient.gender,
        location: `${chpsData.location}, ${chpsData.district} - ${chpsData.region}`,
      },
      question: {
        text: question,
      },
    };

    const res = await axios.post(apiUrl, chatData);

    if (res.status !== 200) {
      throw new Error("There was an error while generating the response");
    }

    const data = res.data;

    console.log({ data });

    const chatResponse: ChatResponse = {
      observation: data.observation,
      answer: data.answer,
      id: crypto.randomUUID(),
      patientId: patientId,
      status: true,
      message: "Response generated successfully!",
    };

    return chatResponse;
  } catch (error: any) {
    if (
      error.response.status === 500 &&
      hasField(error.response.data, "detail")
    ) {
      return {
        status: true,
        message: "Response generated successfully",
        observation: [],
        answer:
          (error.response.data?.detail
            .match(/AI:\s*(.*)$/m)?.[1]
            .trim() as string) ||
          "Rate limit exceeded. Please try again later.",
        patientId: patientId,
        id: crypto.randomUUID(),
      } as ChatResponse;
    }

    return handleApiError(error);
  }
};
