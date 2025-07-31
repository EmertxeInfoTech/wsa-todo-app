import { useState } from "react";
import { Toaster } from "react-hot-toast";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MainLayout } from "./components/MainLayout";
import TaskMain from "./components/TaskMain";

function App() {
  return (
    <div>
      <MainLayout>
        <TaskMain />
      </MainLayout>
      <Toaster />
    </div>
  );
}

export default App;
