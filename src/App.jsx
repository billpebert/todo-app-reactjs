import Navbar from "./components/NavigationBar";
import Home from "./pages/HomeView";

import { Routes, Route } from "react-router-dom";
import DetailView from "./pages/DetailView";

function App() {
	return (
		<>
			<Navbar />
			<main className="pb-20">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/activity-:id" element={<DetailView />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
