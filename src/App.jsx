import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import Home from "./pages/HomeView";
import Detail from "./pages/DetailView";

function App() {
	return (
		<>
			<Navbar />
			<main className="pb-20">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/activity/:id" element={<Detail />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
