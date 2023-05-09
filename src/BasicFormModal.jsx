import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
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

export default function BasicFormModal({
    openButtonText,
    title,
    successMessage,
    mutationHook,
    inputFields,
}) {
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        try {
            await mutationHook(data);
            setSuccess(true);
        } catch (error) {
            console.error('Failed to add data:', error);
        }
    };

    return (
        <div>
            <Button color="secondary" variant="outlined" onClick={handleOpen}>
                {openButtonText}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {success ? successMessage : ''}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {inputFields.map((field) => (
                                <input
                                    key={field.name}
                                    {...register(field.name, field.validationRules)}
                                    placeholder={field.placeholder}
                                />
                            ))}
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}