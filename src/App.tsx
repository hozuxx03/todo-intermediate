import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export const App = () => {
  // Todoを入力欄に入力された文字をstateで管理
  const [todoText, setTodoText] = useState("");

  // 現在入力済みのTodoリストをstateで管理
  const [todos, setTodos] = useState<any[]>([]);

  // Todoを入力欄に何か文字が入力されたらその入力された文字に変更
  const onChangeTodoText = (e: any) => setTodoText(e.target.value);

  // 追加ボタンを押した時に
  const onClickAdd = () => {
    console.log({ todoText });

    // もしTodoを入力欄が空だったら処理をreturnする
    if (todoText === "") return;
    const newTodos: { id: any; text: any; status: string } = {
      id: uuidv4(),
      text: { todoText },
      status: "作業中",
    };

    // 入力したTodoを現在入力済みのTodoリストの配列に追加
    setTodos((newTodos) => [...todos, todoText]);

    // Todoを入力欄を空白に変更
    setTodoText("");
  };

  // 削除ボタンがおされたら
  const onClickDelete = (id: any) => {
    const newTodos = [...todos];
    newTodos.splice(id, 1);
    setTodos(newTodos);
  };
  return (
    <>
      <Box bg="blue.500" w="100%" p={15} color="white">
        Todo List
      </Box>

      <div className="input-area">
        <Input
          value={todoText}
          onChange={onChangeTodoText}
          htmlSize={50}
          width="90%"
          variant="outline"
          placeholder="Todoを入力"
          size="md"
        />
        <Button onClick={onClickAdd} colorScheme="blue" variant="solid">
          追加
        </Button>
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
          {todos.map((id, text, status) => (
            <React.Fragment key={id}>
              <li>{text}</li>
              <Button
                onClick={() => {
                  onClickDelete(id);
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
