"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState, useActionState } from "react";
import { sendMessageAction, SendMessageState } from "../actions/sendMessage";
import { toast } from "sonner";

const ShiftingContactForm = () => {
  const [selected, setSelected] = useState<"company" | "individual">(
    "individual"
  );

  return (
    <section className="p-2 pt-16 md:pt-24">
      <div className="w-full max-w-6xl mx-auto shadow-lg flex flex-col-reverse lg:flex-row rounded-lg overflow-hidden border bg-card">
        <Form selected={selected} setSelected={setSelected} />
        <Images selected={selected} />
      </div>
    </section>
  );
};

const Form = ({
  selected,
  setSelected,
}: {
  selected: "company" | "individual";
  setSelected: Dispatch<SetStateAction<"company" | "individual">>;
}) => {
  const initialState: SendMessageState = {
    message: "",
  };

  const [state, formAction, pending] = useActionState(sendMessageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.sent === true) {
      formRef.current?.reset();
      toast.success(state.message || "Data Sent Successfully ✅");
    } else if (state.sent === false && state.message) {
      toast.error(state.message || "Something Went Wrong ❌");
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="p-8 w-full transition-colors duration-150"
    >
      <h3 className="text-4xl font-bold mb-6 font-handjet">Contact Us</h3>

      {/* Name input */}
      <div className="mb-6">
        <p className="text-2xl mb-2 font-jersey">Hi 👋! My name is...</p>
        <input
          type="text"
          placeholder="Your name..."
          name="name"
          required
          className="border transition-colors duration-700 p-2 rounded-md w-full bg-background"
        />
      </div>

      {/* Company/individual toggle */}
      <div className="mb-6">
        <p className="text-2xl mb-2 font-jersey">and I represent...</p>
        <FormSelect selected={selected} setSelected={setSelected} />
      </div>

      {/* Company name */}
      <AnimatePresence>
        {selected === "company" && (
          <motion.div
            initial={{
              marginTop: -104,
              opacity: 0,
            }}
            animate={{
              marginTop: 0,
              opacity: 1,
            }}
            exit={{
              marginTop: -104,
              opacity: 0,
            }}
            className="mb-6"
          >
            <p className="text-2xl mb-2 font-jersey">by the name of...</p>
            <input
              type="text"
              name="company"
              placeholder="Your organization or group name..."
              className="border transition-colors duration-700 p-2 rounded-md w-full focus:outline-0 bg-background"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="mb-6">
        <p className="text-2xl mb-2 font-jersey">{`I'd love to ask about...`}</p>
        <textarea
          name="description"
          required
          placeholder="Whatever your heart desires :)"
          className="border transition-colors duration-700 min-h-[150px] resize-none p-2 rounded-md w-full focus:outline-0 bg-background"
        />
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground transition-colors duration-200 text-lg text-center rounded-lg w-full py-3 font-semibold disabled:opacity-50"
      >
        {pending ? "Sending..." : "Submit"}
      </motion.button>
    </form>
  );
};

const FormSelect = ({
  selected,
  setSelected,
}: {
  selected: "company" | "individual";
  setSelected: Dispatch<SetStateAction<"company" | "individual">>;
}) => {
  return (
    <div className="border rounded overflow-hidden font-medium w-fit">
      <button
        type="button"
        className={`${
          selected === "company" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
        } text-sm px-3 py-1.5 transition-colors duration-300 relative`}
        onClick={() => setSelected("individual")}
      >
        <span className="relative z-10">An individual</span>
      </button>
      <button
        type="button"
        className={`${
          selected === "company" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        } text-sm px-3 py-1.5 transition-colors duration-300 relative`}
        onClick={() => setSelected("company")}
      >
        <span className="relative z-10">A Group</span>
      </button>
    </div>
  );
};

const Images = ({ selected }: { selected: "company" | "individual" }) => {
  return (
    <div className="relative overflow-hidden w-full min-h-[120px]">
      <motion.div
        initial={false}
        animate={{
          x: selected === "individual" ? "0%" : "100%",
        }}
        className="absolute inset-0 bg-[url('/images/mouse.png')] bg-center bg-contain lg:bg-[length:50%] bg-no-repeat dark:invert"
      />
      <motion.div
        initial={false}
        animate={{
          x: selected === "company" ? "0%" : "-100%",
        }}
        className="absolute inset-0 bg-[url('/images/pointer.png')] bg-center bg-contain lg:bg-[length:50%] bg-no-repeat dark:invert"
      />
    </div>
  );
};

export default ShiftingContactForm;
