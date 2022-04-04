import { useState, useContext } from "react";
import { Container, FormGroup, Checkbox, FormLabel, Grid, TextField, Button, Select, MenuItem, FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { useFormik } from "formik";
import swal from "sweetalert";
import { storeUser } from "../../service/firestore";
//nombre correo telefono contraseña direecion ciudad fecha nac DNI
const SignUp = () => {

    const [dateSelect, setDateSelect] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [validateInputEmpty, setValidateInputEmpty] = useState({
        name: false,
        last_name: false,
        email: false,
        password: false,
        phone: false,
        address: false,
        city: false,
        date_born: false,
        document_number: false,
        gender: false,
    });
    /*
    const [genderSelect, setGenderSelect] = useState("");
    const handleGenderSelect = (e) => {
        setGenderSelect(e.target.value);
    };*/
    /*Vamos a crear una funcion llamada validate la cual se encargara de poder 
    almacenar los errores que tengas en nuestro formularios. Validate va a recibir 
    como parametros los valores de nuestros inputs */

    const validate = (values) => {
        const error = {};
        //aca estaran los errores
        // podemos validar que todos los campos sean requerido
        // para hacerlo pro podriamos usar los key de nuestro inputs y ver que si algunos
        // este vacio lance un error de que todos los campos son requeridos
        // Esto extrae los keys del objeto y los guarda en un array
        Object.keys(values).filter(
            (value) =>
                value !== "marital_status" ||
                value !== "date_born" ||
                values == "gender"
        ).forEach((value) => {
            error[value] = values[value] == "" ? true : false;
        });

        setButtonDisabled(Object.values(error).includes(true));
        setValidateInputEmpty(error);
    };
    const formik = useFormik({
        //Dentro de formik vamos a definir los valores iniciales de nuestro formulario
        initialValues: {
            name: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            city: "",
            date_born: "",
            document_number: "",
            gender: "",
            marital_status: "",
            languages: [],
        }, validate,
        onSubmit:
         (values => {
            if (values.languages.length == 0) {
                swal({
                    icon: "error",
                    title: "Error",
                    text: "Debe completar al menos un idioma",
                });
                return;
            }
            if (values.marital_status == "") {
                swal({
                    icon: "error",
                    title: "Error",
                    text: "Debe completar su estado civil",
                });
                return;
            }
            storeUser(values.email,values.password);
        }
        ),
    });
    return (
        <Container maxWidth="lg">
            {/*Dentro de un form al darle click al boton de tipo submit se activa la accion onSubmit */}
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={12} mt={4}>
                        <h2>CREAR CUENTA</h2>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth label="Ingrese nombre" error={validateInputEmpty.name} name="name" onChange={formik.handleChange}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth label="Ingrese apellido" error={validateInputEmpty.lastname} name="lastname" onChange={formik.handleChange}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth type={"email"} label="Ingrese correo" error={validateInputEmpty.email} name="email" onChange={formik.handleChange}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth type={"password"} label="Ingrese password" error={validateInputEmpty.password} name="password" onChange={formik.handleChange}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth type={"number"} label="Ingrese telefono" error={validateInputEmpty.phone} name="phone" onChange={formik.handleChange}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth label="Ingrese direccion" name="address" error={validateInputEmpty.address} onChange={formik.handleChange}></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth label="Ciudad" name="city" error={validateInputEmpty.city} onChange={formik.handleChange}></TextField>
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
                                    formik.setFieldValue("date_born", date);
                                }}
                                renderInput={(params) => <TextField fullWidth error={validateInputEmpty.date_born} {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth type={"number"} label="DNI" error={validateInputEmpty.document_number} onChange={formik.handleChange} name="document_number"></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                            <Select
                                labelId="genero"
                                name="gender"
                                onChange={formik.handleChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup aria-labelledby="label-radio" name="marital_status" onChange={formik.handleChange}>
                            <FormControlLabel value={"soltero"} control={<Radio />} label="Soltero" />
                            <FormControlLabel value={"divorciado"} control={<Radio />} label="Divorciado" />
                            <FormControlLabel value={"viudo"} control={<Radio />} label="Viudo" />
                            <FormControlLabel value={"casado"} control={<Radio />} label="Casado" />
                        </RadioGroup>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="ingles"
                                        onChange={formik.handleChange}
                                        name="languages"
                                    />
                                }
                                label="Ingles"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="portuges"
                                        onChange={formik.handleChange}
                                        name="languages"
                                    />
                                }
                                label="Portugues"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="espanol"
                                        onChange={formik.handleChange}
                                        name="languages"
                                    />
                                }
                                label="Español"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button type="submit" name="btn" disabled={buttonDisabled} size="large" fullWidth variant="contained">Crear</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
export default SignUp;

// entienden que values es el objeto que tiene los valores delo inputs
// const values = {
//   name: "pepe",
//   last_name: "",
//   email: "",
//   phone_number: "",
//   password: "",
//   address: "",
// };

// ahora al hacer un Objet.key(values)
// estamos extrayendo los key guardandalo en un array
// Object.keys(values);
// [name, last_name, email, phone_number, password, address];

// ahora para poder extraer lo que es un elemente del objeto hay 2 formas
// values.name = pepe
// values[name] = pepe

// Si le hacemos un forEach a Object.keys(values);
// Object.keys(values).forEach((value) => {
//   console.log(value);
//   console.log(values[value]);
//   if (values[value] === "") {
//     console.log("Este valor " + value + " esta vacio");
//   }
// });