import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { list } from "postcss";
import TodoCard from "../components/TodoCard";
import ModalDelete from "../components/ModalDelete";
import ModalCreate from "../components/ModalCreate";

export default function DetailView() {
	const { id } = useParams();
	const api = "https://todo.api.devcode.gethired.id";
	const [isLoading, setIsLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [message, setMessage] = useState("");
	const [activity, setActivity] = useState([]);
	const [todos, setTodos] = useState([]);
	const [activityTitle, setActivityTitle] = useState();
	const [showTitleForm, setShowTitleForm] = useState(false);
	const [activityName, setActivityName] = useState("Default Name");
	const [activityId, setActivityId] = useState(0);

	function getActivity() {
		setIsLoading(true);
		axios
			.get(`${api}/activity-groups/${id}`)
			.then((response) => {
				setActivity(response.data);
				setTodos(response.data.todo_items);
				setActivityTitle(response.data.title);

				// if (localStorage.getItem("sortBy")) {
				// 	sortData(localStorage.getItem("sortBy"));
				// }
				// console.log(todos);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				// showModal.value = true;
				setIsLoading(false);
			});
	}

	function updateActivityTitle() {
        axios
            .patch(`${api}/activity-groups/${id}`, {
                title: activityTitle
            })
            .then((response) => {
                getActivity();
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                toggleEditActName()
            })
		// if (activity.value.title != activityTitle.value) {
		// } else {
		// 	console.warning("Nothing to update");
		// }
	}

	function deleteActivity(id) {
		axios
			.delete(`${api}/todo-items/${id}`)
			.then(() => {
				getActivity();
				setMessage("List berhasil dihapus");
				setShowToast(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function toggleEditActName() {
		setShowTitleForm((prev) => !prev)
        // console.log(showTitleForm)
		if (!showTitleForm) {
			setTimeout(() => {
				document.getElementById("activityName").focus();
			}, 10);
		}
	}

	useEffect(() => {
		getActivity();
	}, []);

	return (
		<>
			<div className="container" data-cy="activity-list-item">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
					<div className="inline-flex items-center gap-5 justify-between md:justify-start w-max">
						{/* <!-- Back Button --> */}
						<Link to="/">
							<button type="button" className="hidden md:block w-5 md:w-6">
								<img src="/svg/ic-chevron-left.svg" alt="" />
							</button>
						</Link>
						<h1 className={`text-base md:text-4xl font-bold ${!showTitleForm ? '' : 'hidden'}`} id="activityH1" data-cy="todo-title" onClick={() => toggleEditActName()}>
							{activity.title}
						</h1>

						{showTitleForm && (
							<input
								type="text"
								className="text-base md:text-4xl font-bold border-b border-b-[#D8D8D8] py-3 read-only:border-none outline-none w-max flex-shrink"
								placeholder={activity.title}
								name="activity_name"
								id="activityName"
                                value={activityTitle}
                                onChange={(e) => setActivityTitle(e.target.value)}
								onBlur={() => updateActivityTitle()}
                                onKeyDown={(e) => e.key == "Enter" ? updateActivityTitle() : false}
							/>
						)}
						<button type="button" className="w-5 md:w-6" onClick={() => toggleEditActName()}>
							<img src="/svg/ic-pencil.svg" alt="" />
						</button>
					</div>
					<div className="inline-flex items-center gap-5 self-end">
						{/* <!-- Sort Button --> */}
						{/* <DropdownSort data-cy="dropdown-sort" /> */}
						<button
							type="button"
							className="flex items-center text-xs md:text-lg font-semibold rounded-full px-[15px] md:px-7 py-2 md:py-3 disabled:bg-opacity-20 bg-skyBlue text-white"
							data-cy="todo-add-button"
							data-te-toggle="modal"
							data-te-target="#exampleModal"
						>
							<img src="/svg/ic-plus.svg" className="mr-[6px] w-3 md:w-6" alt="" />
							Tambah
						</button>
					</div>
				</div>
				<div className="flex flex-col mt-7 md:mt-[50px] gap-y-[10px]">
					{todos.map((todo, key) => {
						return (
							<TodoCard
								key={key}
								label={todo.title}
								priority={todo.priority}
								id={todo.id}
								isActive={todo.is_active}
							/>
						);
					})}
				</div>
			</div>

            <ModalCreate/>
			{/* <ModalDelete title={activityName} id={activityId} deleteHandler={deleteActivity} /> */}
		</>
	);
}
