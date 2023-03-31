import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
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
  useEffect(() => {
    async function fetch() {
      const colRef = doc(db, "categories", categoryId);
      const docs = await getDoc(colRef);
      reset(docs.data());
    }
    fetch();
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name),
      status: values.status,
    });
    toast.success("Update category successfully");
    navigate("/manage/category");
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your  category id : ${categoryId}`}
      ></DashboardHeading>

      <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mx-auto bg-yellow-100 border-yellow-500 max-w-[300px]"
          type="submit"
        >
          <span className=" text-yellow-600"> Update category</span>
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
