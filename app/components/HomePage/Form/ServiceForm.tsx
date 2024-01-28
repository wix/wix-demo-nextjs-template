"use client";
import React from "react";
import { HOME_ROUTE } from "@/app/routes";

const formField = (
  label: string,
  type: string,
  placeholder: string,
  isInput: boolean
) => {
  const blurHandler = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    if (type === "email") {
      const email = e.target.value;
      if (!email.includes("@")) {
        e.currentTarget.classList.add("bg-red-100", "ring-1", "ring-red-500");
      } else {
        e.currentTarget.classList.remove(
          "bg-red-100",
          "ring-1",
          "ring-red-500"
        );
      }
    } else {
      if (e.target.value.length < 1) {
        e.currentTarget.classList.add("bg-red-100", "ring-1", "ring-red-500");
      } else {
        e.currentTarget.classList.remove(
          "bg-red-100",
          "ring-1",
          "ring-red-500"
        );
      }
    }
  };

  return (
    <div className="mb-2">
      <label
        htmlFor={label}
        className="flex items-center mb-2 text-sm text-gray-500"
      >
        {label}{" "}
        <span className="text-gray-500 text-xs inline-block ml-1">*</span>
      </label>
      {isInput ? (
        <input
          type={type}
          id={label}
          name={label} // Add name attribute
          className="block p-1.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500 focus:bg-gray-300 hover:bg-gray-300"
          placeholder={placeholder}
          required
          onBlur={blurHandler}
        />
      ) : (
        <textarea
          id={label}
          name={label} // Add name attribute
          rows={6}
          className="block pt-2.5 pb-0 px-3.5 w-full text-sm text-gray-900 bg-gray-50 shadow-sm border border-gray-300 focus:ring-gray-500 focus:border-gray-500 focus:bg-gray-300 hover:bg-gray-300"
          placeholder={placeholder}
          style={{ resize: "none" }}
          required
          onBlur={blurHandler}
        ></textarea>
      )}
    </div>
  );
};

export default function ServiceForm() {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { Name, Email, Message } = data;
    console.log({ Name, Email, Message });
  };

  return (
    <section className="bg-transparent w-screen md:px-0 px-5">
      <div className="relative md:mt-[152px] mb-16 mx-auto max-w-[553px]">
        <h2 className="mb-7 leading-10 text-center md:text-5xl text-4xl">
          At Your Service
        </h2>
        <p className="mb-5 text-center">
          Tel: 123-456-7890 | Email: info@mysite.com
        </p>
        <p className="font-light text-3xl mb-8 h-3 border-b-2 border-t-2 border-gray-800 w-1/12 mx-auto" />
        <h4 className="mb-3 w-2/3 md:text-2xl text-xl text-center text-gray-800 mx-auto">
          Tell me a little about your event so I can begin the creation process
        </h4>
        <form
          action={HOME_ROUTE}
          className="flex flex-col"
          onSubmit={submitHandler}
        >
          {formField("Name", "text", "Full Name", true)}
          {formField("Email", "email", "name@email.com", true)}
          {formField("Message", "", "Leave your message here...", false)}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-main bg-custom-3 text-custom-1 md:w-32 hover:bg-custom-2 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
