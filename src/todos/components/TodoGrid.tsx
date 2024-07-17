import { type Todo } from "@prisma/client";

import { TodoItem, toggleTodos } from "@todos/index";

interface Props {
  todos?: Todo[];
}

export const TodoGrid = ({ todos }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-[auto] gap-2">
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodos} />
      ))}
    </div>
  );
};
