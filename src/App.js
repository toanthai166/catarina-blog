import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import { AuthProvider } from "./contexts/auth-context";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostAddNew from "./module/post/PostAddNew";
import PostManage from "./module/post/PostManage";
import PostUpdate from "./module/post/PostUpdate";
import UserManage from "./module/user/UserManage";
// import PostManage from "./module/post/PostManage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailPage from "./pages/PostDetailPage";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/:slug"
          element={<PostDetailPage></PostDetailPage>}
        ></Route>
        <Route path="/search/:slug" element={<SearchPage></SearchPage>}></Route>

        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>

        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route path="/blog" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route path="/contact" element={<NotFoundPage></NotFoundPage>}></Route>

        <Route element={<DashboardLayout></DashboardLayout>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/post"
            element={<PostManage></PostManage>}
          ></Route>
          <Route
            path="/manage/add-post"
            element={<PostAddNew></PostAddNew>}
          ></Route>{" "}
          <Route
            path="/manage/update-post"
            element={<PostUpdate></PostUpdate>}
          ></Route>
          <Route
            path="/manage/category"
            element={<CategoryManage></CategoryManage>}
          ></Route>
          <Route
            path="/manage/add-category"
            element={<CategoryAddNew></CategoryAddNew>}
          ></Route>
          <Route
            path="/manage/update-category"
            element={<CategoryUpdate></CategoryUpdate>}
          ></Route>
          <Route
            path="/manage/user"
            element={<UserManage></UserManage>}
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
