import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import { useAddStudentMutation } from '../store/students/students.api';
import { toggleStudentAdded } from '../store/students/students.slice';
import TextField from '@mui/material/TextField/TextField';
import { Divider, Input } from '@mui/material';

import s from "../utils/button.module.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,

};

export default function BasicModal() {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [addStudent] = useAddStudentMutation();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await addStudent({ name: data.name, university: data.university });
            dispatch(toggleStudentAdded());
            handleClose();
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose} sx={{ marginBottom: 2 }}>
                            <CloseIcon color='error' />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <TextField
                                {...register("name", { required: true, maxLength: 20 })}
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                size='normal'
                                sx={{ marginBottom: 2 }} />
                            {errors.name && <span>This field is required and should be no more than 20 characters.</span>}

                            <Divider />

                            <TextField
                                {...register("university", { required: true, pattern: /^[A-Za-z]+$/i })}
                                id="outlined-basic"
                                label="University"
                                variant="outlined"
                                size="normal"
                                sx={{ marginTop: 2 }} ></TextField>
                            {errors.university && (
                                <span>This field is required and should only contain alphabetic characters and spaces.</span>
                            )}
                        </div>

                        <input type='submit' value='add student' className={s.button} style={{ marginTop: 15 }} />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

