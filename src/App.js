import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import MainLayout from "layout/MainLayout";
import Login from "pages/authentication/Login";
import DashboardDefault from "pages/dashboard";
import Students from "pages/student-list/Students";
import AddUser from "pages/add-user/AddUser";
import Course from "pages/courses/Course";
import ErrorPage from "pages/ErrorPage";
import { AuthContext } from "./states/AuthContext";
import { useContext, useEffect, useState } from "react";
import EducatorList from "pages/educator-list/EducatorList";
import ManagerList from "pages/manager-list/ManagerList";
import AssignCourse from "pages/assigncourse/assignCourse";

const App = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={loggedIn ? <MainLayout><DashboardDefault /></MainLayout> : <Navigate to="/" />} />
          <Route path="/add-user" element={loggedIn ? <MainLayout><AddUser /></MainLayout> : <Navigate to="/" />} />
          <Route path="/student" element={loggedIn ? <MainLayout><Students /></MainLayout> : <Navigate to="/" />} />
          <Route path="/manager" element={loggedIn ? <MainLayout><ManagerList /></MainLayout> : <Navigate to="/" />} />
          <Route path="/educator" element={loggedIn ? <MainLayout><EducatorList /></MainLayout> : <Navigate to="/" />} />
          <Route path="/course" element={loggedIn ? <MainLayout><Course /></MainLayout> : <Navigate to="/" />} />
          <Route path="/assigncourse" element={loggedIn ? <MainLayout><AssignCourse /></MainLayout> : <Navigate to="/" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
