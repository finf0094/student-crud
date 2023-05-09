import { Divider, Input } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField/TextField';
import { Fragment, useState } from 'react';
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
    successMessage,
    mutationHook,
    inputFields,
    itemId
}) {
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        try {
            const id = +itemId;
            await mutationHook({ ...data, id });
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
                                <Fragment key={field.name}>
                                    <TextField
                                        id="outlined-basic"
                                        label={field.placeholder}
                                        variant="outlined"
                                        size='normal'
                                        sx={{ marginBottom: 2 }}
                                        key={field.name}
                                        {...register(field.name, field.validationRules)}
                                    />

                                    {errors[field.name] && <span>This field is not required validation.</span>}
                                </Fragment>
                            ))}
                        </div>
                        <Divider />

                        <Input type="submit" value="add" sx={{marginTop: 2}} />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}