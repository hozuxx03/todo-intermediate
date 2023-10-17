import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

export const App = () => {
  const [text, setText] = useState("");
  const [addText, setAddText] = useState("");

  // 追加ボタンを押した時に
  const onClickAddText = () => {
    setAddText(text);
    setText("");
  };
  return (
    <>
      <Box bg="blue.500" w="100%" p={15} color="white">
        Todo List
      </Box>
      <div className="input-area">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          htmlSize={50}
          width="90%"
          variant="outline"
          placeholder="Todoを入力"
          size="md"
        />
        <Button onClick={onClickAddText} colorScheme="blue" variant="solid">
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
      <div>{addText}</div>
    </>
  );
};
