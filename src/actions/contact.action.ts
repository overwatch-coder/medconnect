"use server";

import { getErrors } from "@/lib/parse-error";
import { axiosInstance } from "@/lib/utils";
import { formatResponse, validateSchema } from "@/lib/validations";
import { contactFormSchema } from "@/schema/contact.schema";
import { ResponseData, ContactFormType } from "@/types/index";

// contact us form submit
export const contactFormSubmit = async (data: ContactFormType) => {
  try {
    // validate login data
    const parsedData = validateSchema(contactFormSchema, data);

    if (!parsedData.status) {
      return parsedData;
    }

    // submit data
    const res = await axiosInstance.post(
      "/inquiries/submit-inquiry",
      parsedData.data
    );

    const resData: ResponseData = res.data;

    // return the data response
    return formatResponse(resData);
  } catch (error: any) {
    return getErrors(false, error);
  }
};
