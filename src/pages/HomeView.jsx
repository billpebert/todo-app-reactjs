import ActivityCard from "../components/ActivityCard"
import Button from "../components/Button"
import EmptyActivity from "../components/EmptyActivity"
import Plus from "../components/icon/Plus"
import { useGetActivitiesQuery, useCreateActivityMutation } from "../slice/ActivitySlice"

export default function Home() {
	const { data: activities, isLoading } = useGetActivitiesQuery()
	const [createActivity] = useCreateActivityMutation()

	const onClickCreateActivity = async () => {
		try {
			await createActivity().unwrap()
		} catch (err) {
			console.error("Failed to create activity: ", err)
		}
	}

	const activitiesContent = (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[50px] gap-x-5 gap-y-6">
			{activities?.data.map((activity, index) => {
				return (
					<ActivityCard
						key={index}
						index={index}
						id={activity.id}
						title={activity.title}
						date={activity.created_at}
					/>
				)
			})}
		</div>
	)

	if (isLoading) {
		return <img src="/svg/loader.svg" className="mx-auto" alt="" />
	}

	return (
		<>
			<div className="container">
				<div className="flex items-center justify-between">
					<h1 className="text-base md:text-4xl font-bold" data-cy="activity-title">
						Activity
					</h1>
					<Button variant={"primary"} clickHandler={onClickCreateActivity} dataCy="activity-add-button">
						<Plus />
						Tambah
					</Button>
				</div>

				{activitiesContent}
			</div>

			{!activities.data.length && <EmptyActivity />}
		</>
	)
}
