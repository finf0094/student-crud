import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { useAddStudentMutation } from '../store/students/students.api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [studentAdded, setStudentAdded] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ addStudent ] = useAddStudentMutation();

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            await addStudent({name: data.name, university: data.university, gpa: data.gpa});
            setStudentAdded(true);
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    };



    return (
        <div>
            <Button color="secondary" variant='outlined' onClick={handleOpen}>Add Student</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {studentAdded ? "student added" : ""}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <input {...register("name", { required: true, maxLength: 20 })} placeholder='name' />
                            <input {...register("university", { pattern: /^[A-Za-z]+$/i })} placeholder='university' />
                            <input type='number' step="0.01"{...register("gpa", { min: 1, max: 4 })} placeholder='gpa' />
                        </div>
                        <input type="submit" value="ADD STUDENT" />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}


