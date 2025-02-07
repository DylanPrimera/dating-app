"use client";

import { registerUser } from "@/actions";
import { Button } from "@/components";
import {
  handleFormServerErrors,
  profileSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MemberForm } from "./MemberForm";
import { MemberDetailForm } from "./MemberDetailForm";
import { zodResolver } from "@hookform/resolvers/zod";

const stepSchemas = [registerSchema, profileSchema];

export const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = stepSchemas[activeStep];
  const [isLoading, setIsLoading] = useState(false);
  const registerFormMethods = useForm<RegisterSchema>({
    resolver: zodResolver(currentValidationSchema),
    mode: "onTouched",
  });
  const { handleSubmit, getValues, setError, reset } = registerFormMethods;

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <MemberForm />;
      case 1:
        return <MemberDetailForm />;
      default:
        return "Unknown step";
    }
  };

  const onBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await doRegister(getValues());
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const doRegister: SubmitHandler<RegisterSchema> = async (data) => {
    setIsLoading(true);
    try {
      const resp = await registerUser(data);
      if (resp.status === "success") {
        console.log("user register success");
        reset();
      } else {
        handleFormServerErrors(resp, setError);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <FormProvider {...registerFormMethods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className="space-y-4">
              {getStepContent(activeStep)}
              <div className="flex flex-row items-center gap-6">
                {activeStep !== 0 && (
                  <Button type="button" className="w-full" onClick={onBack}>
                    Back
                  </Button>
                )}
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {activeStep === stepSchemas.length - 1
                    ? "Submit"
                    : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
