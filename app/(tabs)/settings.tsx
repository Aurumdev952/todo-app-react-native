import { Text, View, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { useState } from "react";
import { Todo } from "@/@types/Todo";
const Settings = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View>
        <Text>Settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
