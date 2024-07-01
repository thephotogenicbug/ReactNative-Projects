import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Task } from "@/app";
import Swipeable from "react-native-gesture-handler/Swipeable";

type TaskListItem = {
  task: Task;
  onItemPressed: () => void;
  onDelete: () => void;
};

const RightActions = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "crimson",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 10,
        },
      ]}
    >
      <MaterialCommunityIcons
        onPress={onDelete}
        name="delete"
        size={20}
        color="gainsboro"
      />
    </View>
  );
};

const TaskListItem = ({ task, onItemPressed, onDelete }: TaskListItem) => {
  return (
    <Swipeable
      renderRightActions={(progressAnimatedValue, dragAnimatedValue) => (
        <RightActions onDelete={onDelete} />
      )}
    >
      <Pressable onPress={() => onItemPressed} style={styles.taskContainer}>
        <MaterialCommunityIcons
          name={
            task.isFinished
              ? "checkbox-marked-circle-outline"
              : "checkbox-blank-circle-outline"
          }
          size={24}
          color={task.isFinished ? "green" : "dimgray"}
        />
        <Text
          style={[
            styles.taskTitle,
            {
              textDecorationLine: task.isFinished ? "line-through" : "none",
              color: task.isFinished ? "lightgray" : "dimgray",
            },
          ]}
        >
          {task.title}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskTitle: {
    fontFamily: "InterSemi",
    fontSize: 16,
    flex: 1,
  },
});
