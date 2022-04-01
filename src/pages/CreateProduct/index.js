import { useState } from "react";
import { Container, Grid, TextField, Button } from "@mui/material";
import { storeProductClothe } from "../../service/firestore";
import { async } from "@firebase/util";
import swal from "sweetalert";

const CreateProduct = () => {
    const [values, setValues] = useState({
        name: "",
        photo: "",
        price: "",
        price_sale: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });

    };
    const handeClickStore = async () => {
        await storeProductClothe(values);
        swal({
            icon: "success",
            text: "Se creo correctamente",
            title: "Success",
        })
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <h4 label="Crear Producto"></h4>
                </Grid>
                <Grid item md={6}>
                    <TextField onChange={handleInputChange} name="name" label="Nombre del Producto" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField onChange={handleInputChange} name="photo" label="Link del producto" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField onChange={handleInputChange} name="price" label="Precio del Producto" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField onChange={handleInputChange} name="price_sale" label="Precio oferta del Producto" fullWidth />
                </Grid>
                <Grid item md={12}>
                    <Button variant="contained" onClick={handeClickStore} fullWidth color="success">Crear</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default CreateProduct;