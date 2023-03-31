import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "../../components/button";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import ImageUpload from "../../components/image/ImageUpload";
import { Dropdown } from "../../components/dropdown";
import Toggle from "../../components/toggle/Toggle";
import { Radio } from "../../components/checkbox";
import { postStatus } from "../../utils/constants";
import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import slugify from "slugify";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      user: {},
      image: "",
      hot: false,
    },
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const {
    progress,
    image,
    setProgress,
    setImage,
    handleDeleteImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRef = doc(db, "users", postId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    if (!postId) return;
    async function fetch() {
      const docRef = doc(db, "posts", postId);
      const docData = await getDoc(docRef);
      reset(docData.data());
      setSelectCategory(docData.data()?.category || "");
    }
    fetch();
  }, [postId, reset]);

  const [categories, setCategories] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getData();
  }, []);

  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setCategory(item);
  };

  const HandlerUpdatePost = async (values) => {
    setLoading(true);
    try {
      const colRef = doc(db, "posts", postId);
      await updateDoc(colRef, { ...values, content });
      toast.success("update successfully");
      navigate("/manage/post");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc="Update post content "
      ></DashboardHeading>
      <form onSubmit={handleSubmit(HandlerUpdatePost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              progress={progress}
              image={image}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={selectCategory.name || `Select the category`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        <Field>
          <Label>Content</Label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </Field>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>

          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>

        <Button
          type="submit"
          className="mx-auto max-w-[350px] bg-yellow-100 border-yellow-500"
          isLoading={loading}
          disabled={loading}
        >
          <span className="text-black ">Update post</span>
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
