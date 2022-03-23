import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import { getMovieDetail} from "../../service/movies";

const MovieUpdate = () => {

    const {id} = useParams();


    const [values, setValues] = useState({
        name: "",
        director: "",
        gender: "",
        video_link: "",
        wallpaper: "",
    });


    const handleChangeInput = (e) => {
        const { value, name } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const fetchDetailMovie = async()=>{
        const response = await getMovieDetail(id);
        //cuando hacemos la peticion podemos llenar a values usando setValues
        setValues({
            name: response.name,
            director: response.director,
            gender: response.gender,
            video_link : response.video_link,
            wallpaper: response.wallpaper,
        });
    };
    useEffect(()=>{
        fetchDetailMovie();
    },[]);

    return (
        <Grid container spacing={3} mt={5}>
            <Grid item md={6}>
                <TextField label="Nombre de la pelicula" value={values.name} name="name" fullWidth onChange={handleChangeInput} />
            </Grid>
            <Grid item md={6}>
                <TextField label="Nombre del director"value={values.director}  name="director" fullWidth onChange={handleChangeInput} />
            </Grid>
            <Grid item md={6}>
                <TextField label="Genero" value={values.gender} name="gender" fullWidth onChange={handleChangeInput} />
            </Grid>
            <Grid item md={6}>
                <TextField label="Link del video" value={values.video_link} name="video_link" fullWidth onChange={handleChangeInput} />
            </Grid>
            <Grid item md={6}>
                <TextField label="Link de la portada" value={values.wallpaper} name="wallpaper" fullWidth onChange={handleChangeInput} />
            </Grid>
            <Grid item md={6}>
                <Button variant="contained" color="success" fullWidth>Crear</Button>
            </Grid>
        </Grid>
    );
};
export default MovieUpdate;