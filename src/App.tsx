import React from "react";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { View, Heading } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }


  return (
    <>
      <View as="div">
        <View>
          <Heading level={1}>My todos</Heading>

          </View>
        </View>
      </View>
    </>
  );
}

export default App;