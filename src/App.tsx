import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export const App = () => {
  // Todo入力欄のstate管理
  const [todoText, setTodoText] = useState("");
  // Todoリストのstate管理
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Todoの型を定義
  type TodoType = {
    id: string;
    text: string;
    status: string;
  };

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  // 追加ボタンを押した時の処理
  const onClickAdd = (e: React.FormEvent<HTMLFormElement>) => {
    // 追加ボタンを押した時にページがリロードしない処理
    e.preventDefault();
    // Todo入力欄が空の時の処理
    if (todoText === "") return;
    // 新しいTodoを作成の処理
    const newTodos: TodoType = {
      id: uuidv4(),
      text: todoText,
      status: "未着手",
    };
    //Todoリストの配列に追加の処理
    setTodos([newTodos, ...todos]);
    // Todoを入力欄を空白に変更の処理
    setTodoText("");
  };

  // 削除ボタンが押された時の処理
  const onClickDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // 編集ボタンが押された時の処理
  const onClickEdit = (id: string, text: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <>
      <Box bg="blue.500" w="100%" p={25} color="white">
        Todo List入力欄
      </Box>
      <div className="input-area">
        <form onSubmit={(e) => onClickAdd(e)}>
          <Input
            type="text"
            value={todoText}
            onChange={(e) => onChangeTodoText(e)}
            size="md"
            width="85%"
            variant="outline"
            placeholder="Todoを入力"
          />
          <Input type="submit" value="追加" />
        </form>
      </div>
      <div className="Narrow-down-area">
        絞り込み
        <Select placeholder="全て" width="15%">
          <option value="未着手">未着手</option>
          <option value="着手">着手</option>
          <option value="完了">完了</option>
        </Select>
      </div>
      <Box bg="blue.500" w="100%" p={15} color="white">
        TodoList一覧
      </Box>
      <div>
        <ul>
          {todos.map((todo) => (
            <React.Fragment>
              <li key={todo.id}>
                <Input
                  value={todo.text}
                  type="text"
                  onChange={(e) => onClickEdit(todo.id, e.target.value)}
                  size="md"
                  width="85%"
                  variant="outline"
                />
                <Select placeholder="未着手" width="15%">
                  <option value="着手">着手</option>
                  <option value="完了">完了</option>
                </Select>
              </li>
              <Button
                onClick={() => {
                  onClickDelete(todo.id);
                }}
              >
                削除
              </Button>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};
