import React, { useEffect } from "react";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { Logo } from "../components/logo";
import { useForm } from "react-hook-form";
import { InputPasswordToggle } from "../components/input";
import { Button } from "../components/button";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { useAuth } from "../contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    await signInWithEmailAndPassword(
      auth,
      cloneValues.email,
      cloneValues.password
    );

    toast.success("Login successfully", { lower: true });
    navigate("/");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Sign In Catarina";
  }, []);

  return (
    <AuthenticationPage>
      <form action="" onSubmit={handleSubmit(handleSignIn)}>
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
          Don't have an account yet?
          <NavLink
            to={"/sign-up"}
            className="text-xl font-medium text-green-400 p-2"
          >
            Sign Up
          </NavLink>
        </span>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mt-12 bg-yellow-100 max-w-[250px]"
        >
          Login
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
