import { useState, useEffect } from "react";
import BasicCard from "../../components/BasicCard";
import { Loader } from "../../utils/loader/Loader";
import { useGetStudentsQuery, useSearchStudentsByNameQuery } from "../../store/students/students.api";
import styles from "./students.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleStudentAdded } from "../../store/students/students.slice"

export const Students = ({searchText, setSearchText}) => {
  const [searchActive, setSearchActive] = useState(false);
  const studentAdded = useSelector(state => state.studentsSlice.studentAdded);
  const dispatch = useDispatch();

  const {
    data: students,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
  } = useGetStudentsQuery(undefined, { staleTime: 0 });
  
  const {
    data: searchedStudents,
    isLoading: isSearchedStudentsLoading,
    isError: isSearchedStudentsError,
  } = useSearchStudentsByNameQuery(searchText, { skip: !searchActive });

  const isLoading = searchActive ? isSearchedStudentsLoading : isStudentsLoading;
  const isError = searchActive ? isSearchedStudentsError : isStudentsError;
  const data = searchActive ? searchedStudents : students;

  useEffect(() => {
    if (studentAdded) {
      dispatch(toggleStudentAdded())
      console.log("123")
    }
    if (searchText.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [searchText, studentAdded]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {data ? <div className={styles.grid}>
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
      </div> : isError && "Ошибка. Попробуйте позже."}
    </div>
  );
};