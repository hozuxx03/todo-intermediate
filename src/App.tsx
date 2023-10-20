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

  // Todo入力欄を入力された文字に変更
  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  // 追加ボタンを押した時の処理
  const onClickAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Todo入力欄が空の時の処理
    if (todoText === "") return;
    // 新しいTodoを作成
    const newTodos: TodoType = {
      id: uuidv4(),
      text: todoText,
      status: "未着手",
    };

    //Todoリストの配列に追加
    setTodos([newTodos, ...todos]);

    // Todoを入力欄を空白に変更
    setTodoText("");
  };

  // 削除ボタンが押された時の処理
  const onClickDelete = (id: string) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };
  return (
    <>
      <Box bg="blue.500" w="100%" p={15} color="white">
        Todo List
      </Box>

      <div className="input-area">
        <form onSubmit={(e) => onClickAdd(e)}>
          <Input
            type="text"
            onChange={(e) => onChangeTodoText(e)}
            htmlSize={50}
            width="90%"
            variant="outline"
            placeholder="Todoを入力"
            size="md"
          />
          <Input type="submit" value="追加" />
        </form>
        {/* <Button onClick={onClickAdd} colorScheme="blue" variant="solid">
          追加
        </Button> */}
      </div>
      <div className="Narrow-down-area">
        絞り込み
        <Select placeholder="全て" width="95%">
          <option value="未着手">未着手</option>
          <option value="着手">着手</option>
          <option value="完了">完了</option>
        </Select>
      </div>
      <div>
        <ul>
          {todos.map((newTodos: TodoType) => (
            <React.Fragment key={newTodos.id}>
              <li>{newTodos.id}</li>
              <li>{newTodos.text}</li>
              <li>{newTodos.status}</li>
              <Button
                onClick={() => {
                  onClickDelete(newTodos.id);
                }}
              >
                削除
              </Button>
              <Button>編集</Button>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};
