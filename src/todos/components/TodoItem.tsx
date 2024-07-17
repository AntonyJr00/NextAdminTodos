"use client";

import { type Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      console.log(error);
    }
  };

  return (
    <div
      className={`hover:scale-[1.02] duration-200 ${
        todoOptimistic.complete ? styles.todoDone : styles.todoPending
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-2">
        <div
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-50 ${
            todoOptimistic.complete ? "bg-blue-100" : "bg-rose-100"
          }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline color="#23557a" size={30} />
          ) : (
            <IoSquareOutline color="#23557a" size={30} />
          )}
        </div>

        <div className="text-xl text-sky-600 font-semibold ">
          <p>{todoOptimistic.description}</p>
        </div>
      </div>
    </div>
  );
};
