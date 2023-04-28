import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <input {...register("name", { required: true, maxLength: 20 })}  />
                            <input {...register("university", { pattern: /^[A-Za-z]+$/i })}  />
                            <input type="number" {...register("gpa", { min: 1, max: 4 })} />
                        </div>
                        <input type="submit" />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}