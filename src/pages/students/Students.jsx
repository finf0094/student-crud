import BasicCard from "../../components/BasicCard"
import { Loader } from "../../loader/Loader";
import { useGetStudentsQuery } from "../../store/students/students.api"
import styles from './students.module.css'

export const Students = () => {

    const { data, isLoading, isError } = useGetStudentsQuery();

    return (
        <div className={styles.wrapper}>
            {isError ? "Ошибка попробуйте позже" : ""}
            {isLoading && <Loader />}
            <div className={styles.grid}>
                {data?.map((student) => {
                    return (
                        <BasicCard
                            key={student.id}
                            name={student.name}
                            university={student.university}
                            gpa={student.gpa}
                            id={student.id}
                        />
                    );
                })}
            </div>
        </div>
    )
}
