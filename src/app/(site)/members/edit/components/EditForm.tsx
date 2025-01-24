"use client";

import { updateMemberProfile } from "@/actions";
import { Button, Input } from "@/components";
import { Textarea } from "@/components/ui/textarea";
import { editMemberSchema, EditMemberSchema } from "@/lib";
import { cn, handleFormServerErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Props {
  member: Member;
}

export const EditForm: React.FC<Props> = ({ member }) => {
  const { update } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<EditMemberSchema>({
    resolver: zodResolver(editMemberSchema),
  });

  useEffect(() => {
    reset({
      name: member.name,
      description: member.description,
      city: member.city,
      country: member.country,
    });
  }, [member, reset]);

  const editMember = async (data: EditMemberSchema) => {
    const updatedName = data.name !== member.name;
    const result = await updateMemberProfile(data, updatedName);

    if (result.status !== "success") {
      handleFormServerErrors(result, setError);
      return;
    }
    toast.success("Profile updated");
    if (updatedName) {
      await update({ name: data.name });
    }
    reset({ ...data });

    router.refresh();
  };
  return (
    <form
      onSubmit={handleSubmit(editMember)}
      className="flex flex-col space-y-4 my-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Name
        </label>
        <Input
          id="name"
          placeholder="member description"
          type="text"
          {...register("name")}
          className={cn(errors.name && "focus:ring-rose-500 focus:ring-2")}
        />

        {!isValid && errors.name && (
          <span className="text-red-500 text-sm">
            {errors.name.message as string}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Tell us a little bit about yourself"
          className={cn(
            "resize-none",
            errors.description && "focus:ring-rose-500 focus:ring-2"
          )}
          {...register("description")}
        />

        {!isValid && errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message as string}
          </span>
        )}
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            City
          </label>
          <Input
            id="city"
            placeholder="city name"
            type="text"
            {...register("city")}
            className={cn(errors.city && "focus:ring-rose-500 focus:ring-2")}
          />

          {!isValid && errors.city && (
            <span className="text-red-500 text-sm">
              {errors.city.message as string}
            </span>
          )}
        </div>
        <div className="col-span-6">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            Country
          </label>
          <Input
            id="country"
            placeholder="country name"
            type="text"
            {...register("country")}
            className={cn(errors.country && "focus:ring-rose-500 focus:ring-2")}
          />

          {!isValid && errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message as string}
            </span>
          )}
        </div>
      </div>

      <Button
        className="w-2/5 "
        type="submit"
        disabled={!isValid || !isDirty || isSubmitting}
      >
        Edit
      </Button>
    </form>
  );
};
