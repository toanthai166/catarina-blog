import React, { useEffect } from "react";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useForm } from "react-hook-form";
import { InputPasswordToggle } from "../components/input";
import { Button } from "../components/button";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { userRole, userStatus } from "../utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    await createUserWithEmailAndPassword(
      auth,
      cloneValues.email,
      cloneValues.password
    );
    await updateProfile(auth.currentUser, {
      displayName: cloneValues.fullname,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: cloneValues.fullname,
      email: cloneValues.email,
      password: cloneValues.password,
      avatar:
        "https://plus.unsplash.com/premium_photo-1664204234533-7a9da2bede09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createAt: serverTimestamp(),
    });

    toast.success("Register successfully", { lower: true });
    navigate("/sign-in");

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000);
    // });
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Sign Up Catarina";
  }, []);

  return (
    <AuthenticationPage>
      <form action="" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            control={control}
            placeholder="Please enter your fullname"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            control={control}
            placeholder="Please enter your email address"
            className=""
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <span>
          You already have an account?{" "}
          <NavLink
            to={"/sign-in"}
            className="text-xl font-medium text-green-400 p-2"
          >
            Login
          </NavLink>
        </span>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mt-12 bg-yellow-100 max-w-[250px]"
        >
          SignUp
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
