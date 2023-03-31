import slugify from "slugify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
// import { useFirebaseImage } from "../../hooks/useFirebaseImage";
import { useEffect, useState } from "react";
import Field from "../../components/field/Field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import ImageUpload from "../../components/image/ImageUpload";
import { Dropdown } from "../../components/dropdown";
import Toggle from "../../components/toggle/Toggle";
import { Radio } from "../../components/checkbox";
import { postStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import { db } from "../../firebase/firebase-config";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/auth-context";
import DashboardHeading from "../dashboard/DashboardHeading";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useNavigate } from "react-router-dom";

const PostAddNew = () => {
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
  const watchStatus = watch("status");
  const wathchHot = watch("hot");
  const watchCategory = watch("category");
  const { userInfo } = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      if (!userInfo.uid) return;
      const colRef = doc(db, "users", userInfo.uid);
      const docData = await getDoc(colRef);
      console.log(docData.data());
      setValue("user", {
        id: docData.id,
        ...docData.data(),
      });
    }

    fetchUser();
  }, [setValue, userInfo.uid]);

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

  const {
    progress,
    image,
    setProgress,
    setImage,
    handleDeleteImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);
  const navigate = useNavigate();

  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(cloneValues.slug || cloneValues.title);
      cloneValues.status = Number(values.status);

      // handleUploadImage(cloneValues.image);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        categoryId: cloneValues.category.id,

        image,
        userId: userInfo.uid,
        createAt: serverTimestamp(),
      });
      toast.success("Create new post successfully");
      navigate("/manage/post");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        user: {},

        image: "",
        hot: false,
      });
      // setImage(null);
      setCategory("");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeading title="Add new post" desc="Add post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
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
                placeholder={category.name || `Select the category`}
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
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={wathchHot === true}
              onClick={() => setValue("hot", !wathchHot)}
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
          <span className="text-black "> Add new post</span>
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;
