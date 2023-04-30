import { useParams } from "react-router-dom";
import { Loader } from "../../loader/Loader";
import { useDeleteStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation } from "../../store/students/students.api"
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Button, Textarea } from "@mui/joy";

export const Student = () => {
    const [name, setName] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [university, setUniversity] = useState("");
    const [isEditingUniversity, setIsEditingUniversity] = useState(false);
    const [gpa, setGpa] = useState("");
    const [isEditingGpa, setIsEditingGpa] = useState(false);

    const [isChanged, setIsChanged] = useState(false);



    const { id } = useParams();
    const { data, isLoading } = useGetStudentByIdQuery(id);
    const [updateStudent] = useUpdateStudentMutation();
    const [ deleteStudent ] = useDeleteStudentMutation();

    

    return (
        <>
            {data ? <div style={{
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            justifyContent: "center",
            marginTop: 100
        }}>
            {isLoading ?
                <Loader /> :
                <Box
                    sx={{
                        width: 400,
                        height: 400,
                        backgroundColor: 'primary.dark',
                        transition: "0.2s ease",
                        opacity: [0.9, 0.8, 0.7],
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            cursor: "pointer"
                        },
                        borderRadius: 10,
                        margin: "0 auto",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Button onClick={() => deleteStudent(data.id)} >Delete</Button>
                    <Typography level="h1" component="h1" sx={{
                        marginTop: 3,
                        marginLeft: 15,
                        marginBottom: 3,
                        fontWeight: "600",
                        color: "white",
                        fontSize: 24
                    }}>
                        ID: {data.id}
                    </Typography>

                    {isEditingName ?
                        <Textarea
                            size="sm"
                            name="Size"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setIsEditingName(false)}
                            sx={{
                                marginLeft: 14,
                                marginRight: 14,
                                marginBottom: 3
                            }} />
                        :
                        <Typography level="h1" component="h1" onDoubleClick={() => setIsEditingName(true)}
                            sx={{
                                marginLeft: 15,
                                marginBottom: 3,
                                fontWeight: "600",
                                color: "white",
                                fontSize: 24
                            }}>
                            Name: {name !== "" ? name : data.name}
                        </Typography>}


                    {isEditingUniversity ?
                        <Textarea
                            size="sm"
                            name="Size"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            onBlur={() => setIsEditingUniversity(false)}
                            sx={{
                                marginLeft: 14,
                                marginRight: 14,
                                marginBottom: 3
                            }} />
                        :
                        <Typography level="h2" component="h1" onDoubleClick={() => setIsEditingUniversity(true)} sx={{
                            marginLeft: 15,
                            marginBottom: 3,
                            fontWeight: "600",
                            color: "white"
                        }}>
                            University: {university !== "" ? university : data.university}
                        </Typography>}


                    {isEditingGpa ?
                        <Textarea
                            size="sm"
                            name="Size"
                            value={gpa}
                            onChange={(e) => setGpa(e.target.value)}
                            onBlur={() => setIsEditingGpa(false)}
                            sx={{
                                marginLeft: 14,
                                marginRight: 14,
                                marginBottom: 3
                            }} />
                        :
                        <Typography level="h2" itemType="number" component="h1" onDoubleClick={() => setIsEditingGpa(true)} sx={{
                            marginLeft: 15,
                            marginBottom: 3,
                            fontWeight: "600",
                            color: "white"
                        }}>
                            GPA: {gpa !== "" ? gpa : data.gpa}
                        </Typography>}

                    {name !== "" || university !== "" || gpa !== "" ?
                        <Button color="success" onClick={() => {
                            setIsChanged(true);
                            updateStudent({ name: name === "" ? data?.name : name, university: university === "" ? data?.university : university, gpa: gpa === "" ? +data?.gpa : +gpa, id: id })
                        }}
                            sx={{
                                marginLeft: 15,
                                marginTop: 2
                            }}>Change</Button> : ""}

                    {isChanged ? <Typography sx={{
                        marginLeft: 15,
                        marginTop: 1,
                        fontWeight: "600",
                        color: "white"
                    }}>Changed</Typography> : ""}
                </Box>}
        </div> : <h1>DELETED</h1>}
        </>
    )
}
