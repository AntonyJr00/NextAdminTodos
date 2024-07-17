"use client";

import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

import { addTodo, deleteCompleted } from "../actions/todos-actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return console.log("Input vacio");

    await addTodo(description);
    setDescription((prev) => (prev = ""));
  };
  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none text-black focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex-grow"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex gap-2 items-center justify-center rounded bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Borrar Completados
      </button>
    </form>
  );
};
