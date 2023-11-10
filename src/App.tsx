import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export const App = () => {
  // Todoの型を定義
  type TodoType = {
    id: string;
    text: string;
    status: string;
  };

  // Todo入力欄のstate管理
  const [todoText, setTodoText] = useState("");
  // Todoリストのstate管理
  const [todos, setTodos] = useState<TodoType[]>([]);
  // フィルターのstate管理
  const [filter, setFilter] = useState("未着手");
  // 絞り込まれたTodoリストのstate管理
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);

  // Todo入力欄に文字が入力された時の処理
  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  // 追加ボタンを押した時の処理
  const onClickAdd = (e: React.FormEvent<HTMLFormElement>) => {
    // ページがリロードしない処理
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

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "未着手":
          setFilteredTodos(todos.filter((todo) => todo.status === "未着手"));
          break;
        case "着手":
          setFilteredTodos(todos.filter((todo) => todo.status === "着手"));
          break;
        case "完了":
          setFilteredTodos(todos.filter((todo) => todo.status === "完了"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

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
  // Todoリストのステータスが変更された時の処理
  const handleStatusChange = (
    targetTodo: { id: string; text: string; status: string },
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(targetTodo, e);

    // Todoリストを更新
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
    console.log(newArray);
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
          <Button type="submit">追加</Button>
        </form>
      </div>
      <div className="Narrow-down-area">
        絞り込み
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          defaultValue="全て"
          width="15%"
        >
          <option value="全て">全て</option>
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
          {filteredTodos.map((todo) => (
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
                <Select
                  value={todo.status}
                  // placeholder="未着手"
                  width="15%"
                  onChange={(e) => handleStatusChange(todo, e)}
                >
                  <option value="未着手">未着手</option>
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
