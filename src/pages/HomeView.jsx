import { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import AlertToast from "../components/AlertToast";
import Button from "../components/Button";
import ModalDelete from "../components/ModalDelete";
import EmptyActivity from "../components/EmptyActivity";

export default function Home() {
	const [activityName, setActivityName] = useState("Default Name");
	const [activityId, setActivityId] = useState(0);

	const [activities, setActivities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [message, setMessage] = useState("");
	const [showModalDelete, setShowModalDelete] = useState(false);

	const api = "https://todo.api.devcode.gethired.id";
	const email = "bilpo@mail.com";

	useEffect(() => {
		getActivities();
	}, []);

	function getActivities() {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${api}/activity-groups?email=${email}`);
				setActivities(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		return { activities, isLoading };
	}

	function createActivity() {
		axios
			.post(`${api}/activity-groups`, {
				title: "New Activity",
				email: email,
			})
			.then((response) => {
				// console.log(response)
				getActivities();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const closeModal = () => {
		setShowModalDelete((state) => !state)
	} 

	function deleteActivity(id) {
		axios
			.delete(`${api}/activity-groups/${id}`)
			.then(function (response) {
				getActivities();
				setMessage("Activity berhasil dihapus");
				setShowToast(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function passDataToModal(id, name) {
		setActivityId(id);
		setActivityName(name);

		// Open delete modal
		setShowModalDelete((state) => !state);
	}

	return (
		<>
			{isLoading ? (
				<img src="/svg/loader.svg" className="mx-auto" alt="" />
			) : (
				<>
					<div className="container">
						<div className="flex items-center justify-between">
							<h1 className="text-base md:text-4xl font-bold" data-cy="activity-title">
								Activity
							</h1>
							<div data-cy="activity-add-button">
								<Button variant={"primary"} clickHandler={createActivity}>
									<img src="/svg/ic-plus.svg" className="mr-[6px] w-3 md:w-6" alt="" />
									Tambah
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[50px] gap-x-5 gap-y-6">
							{activities.map((activity, index) => {
								return (
									<ActivityCard
										key={index}
										index={index}
										id={activity.id}
										title={activity.title}
										date={activity.created_at}
										clickHandler={passDataToModal}
									/>
								);
							})}
						</div>
					</div>

					{showModalDelete && (
						<ModalDelete title={activityName} id={activityId} deleteHandler={deleteActivity} closeModal={closeModal} />
					)}
					{showToast && <AlertToast message={message} />}
					{!activities.length && <EmptyActivity />}
				</>
			)}
		</>
	);
}
