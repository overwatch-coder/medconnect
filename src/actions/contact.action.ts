"use server";

import { getErrors } from "@/lib/parse-error";
import { axiosInstance } from "@/lib/utils";
import { contactFormSchema } from "@/schema/contact.schema";
import { ResponseData, ContactFormType } from "@/types/index";

// contact us
export const contactFormSubmit = async (data: ContactFormType) => {
  try {
    // validate login data
    const validatedData = contactFormSchema.safeParse(data);

    if (!validatedData.success) {
      return getErrors({}, true, validatedData.error);
    }

    // submit data
    const res = await axiosInstance.post(
      "/inquiries/submit-inquiry",
      validatedData.data
    );

    const resData: ResponseData = res.data;

    // return the data response
    return {
      success: resData.success,
      message: resData.message,
      data: resData.success ? resData.data : null,
      errors: !resData.success ? [resData.message] : [],
    };
  } catch (error: any) {
    console.log("contact-us submit error => ", { error });

    return getErrors(error, false);
  }
};
