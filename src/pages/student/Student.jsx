import { useParams } from "react-router-dom";
import BasicCard from "../../components/BasicCard";
import { Loader } from "../../loader/Loader";
import { useGetStudentByIdQuery } from "../../store/students/students.api"

export const Student = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetStudentByIdQuery(id);

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            justifyContent: "center",
            marginTop: 100
        }}>
            {isLoading ? <Loader /> : <BasicCard name={data.name} university={data.university} gpa={data.gpa} />}
        </div>
    )
}
