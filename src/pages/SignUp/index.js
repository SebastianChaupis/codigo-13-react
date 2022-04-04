import { useState } from "react";
import { Container, Grid, TextField, Button, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { useFormik } from "formik";
//nombre correo telefono contraseña direecion ciudad fecha nac DNI
const SignUp = () => {
    const [dateSelect, setDateSelect] = useState(null);
    const [genderSelect, setGenderSelect] = useState("");
    const handleGenderSelect = (e)=>{
        setGenderSelect(e.target.value);
    }
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item md={12} mt={4}>
                    <h2>CREAR CUENTA</h2>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="Ingrese nombre" name="name"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="Ingrese apellido" name="lastname"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth type={"email"} label="Ingrese correo" name="email"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth type={"password"} label="Ingrese password" name="password"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth type={"number"} label="Ingrese telefono" name="phone"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="Ingrese direccion" name="address"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="Ciudad" name="city"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label="Fecha de nacimiento"
                            name="date_born"
                            inputFormat="dd/MM/yyyy"
                            value={dateSelect}
                            onChange={(date) => {
                                setDateSelect(date);
                            }}
                            renderInput={(params) => <TextField{...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField fullWidth label="DNI" name="document_number"></TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                            <Select
                             labelId="genero"
                             value={genderSelect}
                             onChange={handleGenderSelect}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={3}>
                <Grid item md={6} xs={12}>
                    <Button style={{ height: 40 }} fullWidth variant="contained">Crear</Button>
                </Grid>
            </Grid>
        </Container>
    );
}
export default SignUp;