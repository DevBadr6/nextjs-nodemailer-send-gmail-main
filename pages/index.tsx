import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

/* https://qiita.com/waterleaper/items/3c948ff9fe85bdb2e404 */
export default function Home() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // // const {name, ref, onChange, onBlur} = register("name")

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sending...");
    console.log(nameRef.current?.value);

    let data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) console.log("Send successfully");
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mt-5 ">
        <h2 className="mb-3">Send email with Next.js</h2>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              name
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              required
              ref={nameRef}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              email address
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              required
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              message
            </label>
            <textarea
              className="form-control"
              id="message"
              required
              ref={messageRef}
            />
          </div>
          <button className="btn btn-danger" type="submit">
            send e-mail
          </button>
        </form>
      </div>
    </>
  );
}
