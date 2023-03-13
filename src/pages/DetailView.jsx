import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import ModalDelete from "../components/ModalDelete";
import ModalCreate from "../components/ModalCreate";
import AlertToast from "../components/AlertToast";
import DropdownSort from "../components/DropdownSort";
import Button from "../components/Button";
import EmptyTodo from "../components/EmptyTodo";

export default function DetailView() {
	const { id } = useParams();
	const api = "https://todo.api.devcode.gethired.id";
	const [isLoading, setIsLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [message, setMessage] = useState("");
	const [activity, setActivity] = useState([]);
	const [todos, setTodos] = useState([]);
	const [activityTitle, setActivityTitle] = useState();
	const [activityGroup, setActivityGroup] = useState();
	const [showTitleForm, setShowTitleForm] = useState(false);
	const [activityName, setActivityName] = useState("Default Name");
	const [activityId, setActivityId] = useState(0);
	const [isUpdate, setIsUpdate] = useState(false)
	const [showModalDelete, setShowModalDelete] = useState(false);

	// Pass to edit modal
	const [todoEditId, setTodoEditId] = useState(0);
	const [todoEditTitle, setTodoEditTitle] = useState("");
	const [todoEditPriority, setTodoEditPriority] = useState("Pilih priority");

	function getActivity() {
		setIsLoading(true);
		axios
			.get(`${api}/activity-groups/${id}`)
			.then((response) => {
				setActivity(response.data);
				setActivityTitle(response.data.title);
				setActivityGroup(response.data.id);
				setTodos(response.data.todo_items);
				// console.log(todos);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				// if (localStorage.getItem("sortBy")) {
				//     sortData(localStorage.getItem("sortBy"));
				// }
				setIsLoading(false);
			});
	}

	function updateActivityTitle() {
		if (activity.title != activityTitle) {
			axios
				.patch(`${api}/activity-groups/${id}`, {
					title: activityTitle,
				})
				.then((response) => {
					getActivity();
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					toggleEditActName();
				});
		} else {
			console.log("Nothing to update");
			toggleEditActName();
		}
	}

	function createItem(title, priority) {
		axios
			.post(`${api}/todo-items`, {
				title: title,
				activity_group_id: activityGroup,
				priority: priority,
			})
			.then((response) => {
				setIsUpdate(false)
				getActivity();
				// console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function updateItem(id, title, priority) {
		// console.log(id, title, priority)
		axios
			.patch(`${api}/todo-items/${id}`, {
				id: id,
				title: title,
				activity_group_id: activityGroup,
				priority: priority,
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				getActivity();
			});
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

	function markAsDone(id, value) {
		axios
			.patch(`${api}/todo-items/${id}`, {
				is_active: value,
			})
			.then(() => {
				getActivity();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Switch #activityH1 with input
	const toggleEditActName = () => {
		setShowTitleForm((state) => !state);
		// console.log(showTitleForm)
		if (!showTitleForm) {
			setTimeout(() => {
				document.getElementById("activityName").focus();
			}, 10);
		}
	};

	// Make sure that the modal form is cleared
	const modalCreateData = () => {
		setIsUpdate(false)
		setTodoEditId(0);
		setTodoEditTitle("");
		setTodoEditPriority("Pilih priority");
	}

	// Pass existing todo data to modal
	const modalEditData = (id, title, priority) => {
		setIsUpdate(true)
		setTodoEditId(id);
		setTodoEditTitle(title);
		setTodoEditPriority(priority);
	};

	const closeModal = () => {
		setShowModalDelete((state) => !state)
	} 

	// Pass data to modal delete
	function passToModalDelete(id, name) {
		setShowModalDelete((state) => !state)
		return setActivityName(name), setActivityId(id);
	}

	function sortData(type) {
		if (localStorage.getItem("sortBy")) localStorage.setItem("sortBy", type);

		const todoItems = [...todos];
		if (type == "asc") {
			todoItems.sort(function (a, b) {
				// changing the case (to upper or lower) ensures a case insensitive sort.
				let textA = a.title.toUpperCase();
				let textB = b.title.toUpperCase();
				return textA < textB ? -1 : textA > textB ? 1 : 0;
			});
		} else if (type == "desc") {
			todoItems.sort(function (a, b) {
				// changing the case (to upper or lower) ensures a case insensitive sort.
				let textA = a.title.toUpperCase();
				let textB = b.title.toUpperCase();
				return textA > textB ? -1 : textA < textB ? 1 : 0;
			});
		} else if (type == "newest") {
			todoItems.sort(function (a, b) {
				let idA = new Date(a.id);
				let idB = new Date(b.id);
				return idB - idA;
			});
		} else if (type == "oldest") {
			todoItems.sort(function (a, b) {
				let idA = new Date(a.id);
				let idB = new Date(b.id);
				return idA - idB;
			});
		} else if (type == "ongoing") {
			todoItems.sort(function (a, b) {
				return a.is_active - b.is_active;
			});
		}
		setTodos(todoItems);
	}

	useEffect(() => {
		getActivity();
	}, []);

	return (
		<>
			{isLoading ? (
				<img src="/svg/loader.svg" className="mx-auto" alt="" />
			) : (
				<>
					<div className="container" data-cy="activity-list-item">
						{/* Header */}
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
							<div className="inline-flex items-center gap-5 justify-between md:justify-start w-max">
								{/* <!-- Back Button --> */}
								<Link to="/">
									<button type="button" className="hidden md:block w-5 md:w-6" data-cy="todo-back-button">
										<img src="/svg/ic-chevron-left.svg" alt="" />
									</button>
								</Link>
								<h1
									className={`text-base md:text-4xl font-bold ${showTitleForm ? "hidden" : ""}`}
									id="activityH1"
									data-cy="todo-title"
									onClick={toggleEditActName}
								>
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
										onKeyDown={(e) => (e.key == "Enter" ? updateActivityTitle() : false)}
									/>
								)}
								<button type="button" className="w-5 md:w-6" onClick={toggleEditActName} data-cy="todo-title-edit-button">
									<img src="/svg/ic-pencil.svg" alt="" />
								</button>
							</div>
							<div className="inline-flex items-center gap-5 self-end">
								{/* <!-- Sort Button --> */}
								<DropdownSort sortData={sortData} />

								{/* Button Tambah */}
								<div data-cy="todo-add-button" data-te-toggle="modal" data-te-target="#exampleModal">
									<Button variant="primary" clickHandler={() => modalCreateData()}>
										<img src="/svg/ic-plus.svg" className="mr-[6px] w-3 md:w-6" alt="" />
										Tambah
									</Button>
								</div>
							</div>
						</div>
						<div className="flex flex-col mt-7 md:mt-[50px] gap-y-[10px]">
							{todos.map((todo, key) => {
								return (
									<TodoCard
										key={key}
										index={key}
										label={todo.title}
										priority={todo.priority}
										id={todo.id}
										isActive={todo.is_active}
										markAsDone={markAsDone}
										passToModalDelete={passToModalDelete}
										passToModalEdit={modalEditData}
									/>
								);
							})}
						</div>

						{!todos.length && <EmptyTodo />}
					</div>
					{showToast && <AlertToast message={message} />}
					<ModalCreate
						method={isUpdate ? "edit" : "create"}
						submitHandler={isUpdate ? updateItem : createItem}
						defId={todoEditId}
						defTitle={todoEditTitle}
						defPriority={todoEditPriority}
					/>
					{
						showModalDelete && (
							<ModalDelete title={activityName} id={activityId} deleteHandler={deleteActivity} closeModal={closeModal} />
						)
					}
				</>
			)}
		</>
	);
}
