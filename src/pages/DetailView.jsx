import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import ModalDelete from "../components/ModalDelete";
import ModalCreate from "../components/ModalCreate";
import AlertToast from "../components/AlertToast";
import DropdownSort from "../components/DropdownSort";
import Button from "../components/Button";
import EmptyTodo from "../components/EmptyTodo";
import ButtonBack from "../components/ButtonBack";
import IconPencil from "../components/icon/IconPencil";
import Plus from "../components/icon/Plus";
import { init_state, todoReducer } from "../reducer/todoReducer";
import useModal from "../app/useModal";

export default function DetailView() {
	const { id } = useParams();
	const api = "https://todo.api.devcode.gethired.id";

	const [state, dispatch] = useReducer(todoReducer, init_state);
	const [isLoading, setIsLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [message, setMessage] = useState("");
	const [showTitleForm, setShowTitleForm] = useState(false);
	const [activityName, setActivityName] = useState("Default Name");
	const [activityId, setActivityId] = useState(0);
	const [isUpdate, setIsUpdate] = useState(false);
	const [isShowing, toggleModal] = useModal()

	// Pass to edit modal
	const [todoEditId, setTodoEditId] = useState(0);
	const [todoEditTitle, setTodoEditTitle] = useState("");
	const [todoEditPriority, setTodoEditPriority] = useState("Pilih priority");

	function getActivity() {
		// setIsLoading(true);
		axios
			.get(`${api}/activity-groups/${id}`)
			.then((response) => {
				// setTodos
				dispatch({ 
					type: "fetchActivity",
					payload: {
						activity: response.data, 
						activityTitle: response.data.title, 
						activityId: response.data.id,
						todos: response.data.todo_items
					} 
			});
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				if (localStorage.getItem("sortBy")) {
					sortData(localStorage.getItem("sortBy"));
				}
			});
	}
	// console.log(state);

	function updateActivityTitle() {
		if (state.activity.title != state.activityTitle) {
			axios
				.patch(`${api}/activity-groups/${id}`, {
					title: state.activityTitle,
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
				activity_group_id: state.activityId,
				priority: priority,
			})
			.then((response) => {
				setIsUpdate(false);
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
				activity_group_id: state.activityId,
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
		setIsUpdate(false);
		setTodoEditId(0);
		setTodoEditTitle("");
		setTodoEditPriority("Pilih priority");
	};

	// Pass existing todo data to modal
	const modalEditData = (id, title, priority) => {
		setIsUpdate(true);
		setTodoEditId(id);
		setTodoEditTitle(title);
		setTodoEditPriority(priority);
	};

	// Pass data to modal delete
	function passToModalDelete(id, name) {
		toggleModal()
		return setActivityName(name), setActivityId(id);
	}

	function sortData(type) {
		localStorage.setItem("sortBy", type);
		dispatch({type: type});
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
						<div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
							<div className="inline-flex items-center gap-5 justify-between md:justify-start w-max">
								{/* <!-- Back Button --> */}
								<Link to="/" className="hidden md:block">
									<ButtonBack />
								</Link>

								{!showTitleForm && (
									<h1
										className="text-base md:text-4xl font-bold"
										id="activityH1"
										data-cy="todo-title"
										onClick={toggleEditActName}
									>
										{state.activity.title}
									</h1>
								)}

								{showTitleForm && (
									<input
										type="text"
										className="text-base md:text-4xl font-bold border-b border-b-[#D8D8D8] py-3 read-only:border-none outline-none w-max flex-shrink"
										placeholder={state.activity.title}
										name="activityTitle"
										id="activityName"
										value={state.activityTitle}
										onChange={(e) => dispatch({type:'changeActivityTitle', payload: {name: e.target.name, value: e.target.value}})}
										onBlur={() => updateActivityTitle()}
										onKeyDown={(e) => (e.key == "Enter" ? updateActivityTitle() : false)}
									/>
								)}
								<button
									type="button"
									className="w-5 md:w-6"
									onClick={toggleEditActName}
									data-cy="todo-title-edit-button"
								>
									<IconPencil />
								</button>
							</div>
							<div className="inline-flex items-center gap-5 self-end">
								{/* <!-- Sort Button --> */}
								<DropdownSort sortData={sortData} />

								{/* Button Tambah */}
								<div data-te-toggle="modal" data-te-target="#exampleModal">
									<Button
										variant="primary"
										clickHandler={() => modalCreateData()}
										dataCy="todo-add-button"
									>
										<Plus />
										Tambah
									</Button>
								</div>
							</div>
						</div>
						<div className="flex flex-col mt-7 md:mt-[50px] gap-y-[10px]">
							{state.todos?.map((todo, key) => {
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

						{!state.todos?.length && <EmptyTodo />}
					</div>

					{/* Alert */}
					{showToast && <AlertToast message={message} />}

					{/* Modal Create & Update */}
					<ModalCreate
						method={isUpdate ? "edit" : "create"}
						submitHandler={isUpdate ? updateItem : createItem}
						defId={todoEditId}
						defTitle={todoEditTitle}
						defPriority={todoEditPriority}
					/>

					{/* Modal delete */}
					{isShowing && (
						<ModalDelete
							title={activityName}
							id={activityId}
							deleteHandler={deleteActivity}
							closeModal={toggleModal}
						/>
					)}
				</>
			)}
		</>
	);
}
