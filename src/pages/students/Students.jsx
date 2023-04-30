import { useState, useEffect } from "react";
import BasicCard from "../../components/BasicCard";
import { Loader } from "../../loader/Loader";
import { useGetStudentsQuery, useSearchStudentsByNameQuery } from "../../store/students/students.api";
import styles from "./students.module.css";

export const Students = ({searchText, setSearchText}) => {
  const [searchActive, setSearchActive] = useState(false);
  
  const {
    data: students,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
  } = useGetStudentsQuery();
  
  const {
    data: searchedStudents,
    isLoading: isSearchedStudentsLoading,
    isError: isSearchedStudentsError,
  } = useSearchStudentsByNameQuery(searchText, { skip: !searchActive });

  const isLoading = searchActive ? isSearchedStudentsLoading : isStudentsLoading;
  const isError = searchActive ? isSearchedStudentsError : isStudentsError;
  const data = searchActive ? searchedStudents : students;

  useEffect(() => {
    if (searchText.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [searchText]);

  return (
    <div className={styles.wrapper}>
      {isError && "Ошибка. Попробуйте позже."}
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
  );
};