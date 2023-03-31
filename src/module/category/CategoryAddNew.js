import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import Field from "../../components/field/Field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const navigte = useNavigate();

  const addCategory = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(newValues.slug || newValues.name);
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createAt: serverTimestamp(),
      });
      toast.success("create new category successfully");
      navigte("/manage/category");
    } catch (error) {
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(addCategory)}>
        <div className="grid grid-cols-2 gap">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="mb-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>

              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus === categoryStatus.UNAPPROVED)}
                onClick={() => setValue("status", "unapproved")}
                value={Number(categoryStatus.UNAPPROVED)}
              >
                Unapproved
              </Radio>
            </div>
            {/* <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.PENDING}
                onClick={() => setValue("status", "approved")}
                value={categoryStatus.PENDING}
              >
                Approved
              </Radio>

              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus === categoryStatus.UNAPPROVED)}
                onClick={() => setValue("status", "unapproved")}
                value={Number(categoryStatus.UNAPPROVED)}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes> */}
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mx-auto bg-yellow-100 border-yellow-500 max-w-[300px]"
          type="submit"
        >
          <span className=" text-yellow-600"> Add new category</span>
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
