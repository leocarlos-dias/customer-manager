import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { UserProvider } from "./contexts/UserContext";
import { MainRoutes as Routes } from "./routes";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes />
      <Footer />
      <Toaster />
    </UserProvider>
  );
}

export default App;
