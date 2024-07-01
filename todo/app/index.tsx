import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import NewTaskInput from "../components/NewTaskInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import TaskListItem from "@/components/TaskListItem";

export type Task = {
  title: string;
  isFinished: boolean;
};

const dummyTasks: Task[] = [
  {
    title: "Setup Day 1 Structure",
    isFinished: true,
  },
  {
    title: "Render a list of tasks",
    isFinished: false,
  },
  {
    title: "Add a new task",
    isFinished: false,
  },
  {
    title: "Change the status of a task",
    isFinished: false,
  },
  {
    title: "Separate in 2 tabs : todo, and complete",
    isFinished: false,
  },
];

const index = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (!searchQuery) {
      return true;
    }
    return task.title
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase().trim());
  });

  const onItemPressed = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTask = [...currentTasks];
      updatedTask[index].isFinished = !updatedTask[index].isFinished;
      console.log(updatedTask);

      return updatedTask;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((currentTasks) => {
      const updatedTask = [...currentTasks];
      updatedTask.splice(index, 1);
      return updatedTask;
    });
  };

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={900}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            title: "TODO",
            headerBackTitleVisible: false,
            headerSearchBarOptions: {
              hideWhenScrolling: true,
              onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
            },
          }}
        />
        <SafeAreaView>
          <FlatList
            data={filteredTasks}
            contentContainerStyle={{ gap: 5, padding: 10 }}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              <>
                <TaskListItem
                  task={item}
                  onItemPressed={() => onItemPressed(index)}
                  onDelete={() => deleteTask(index)}
                />
              </>
            )}
            ListFooterComponent={() => (
              <NewTaskInput
                onAdd={(newTodo: Task) =>
                  setTasks((currentTasks) => [...currentTasks, newTodo])
                }
              />
            )}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
