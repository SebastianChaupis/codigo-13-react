import { useState, useEffect } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteItem, getMovies } from "../../service/movies";
import { Link } from "react-router-dom";
import {
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";
import swal from "sweetalert";
//Componentes
import MovieCreate from "../../components/MovieCreate";




const YoutubeAdministrador = () => {

    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const response = await getMovies();
        setMovies(response);
    };

    const fetchDeleteItem = async (id) => {
        const response = await swal({
            title: "Estas seguro eliminar?",
            text: "Recuerda que una vez eliminado no hay vuelta atras",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
        if (response) {
            await deleteItem(id);
            await fetchMovies();
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    return (
        <Container>
            <Grid container spacing={3} mt={3} mb={3}>
                <Grid item md={6}>
                    <h4>Lista de Peliculas</h4>
                </Grid>
                <Grid item md={6} sx={{textAlign:"right"}}>
                    <MovieCreate fetchMovies={fetchMovies}/>
                </Grid>

            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Genero</TableCell>
                            <TableCell>Link del video</TableCell>
                            <TableCell>Botones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            movies.length > 0 && movies.map((movie) => (
                                <TableRow>
                                    <TableCell>{movie.name}</TableCell>
                                    <TableCell>{movie.director}</TableCell>
                                    <TableCell>{movie.gender}</TableCell>
                                    <TableCell><a href={movie.video_link}>Ver Video</a></TableCell>
                                    <TableCell>
                                        <Link to={`/youtube/admin/editar/${movie.id}`}>
                                        <Button color="info" >
                                            <EditRoundedIcon />
                                        </Button>
                                        </Link>
                                        <Button color="error" onClick={() => fetchDeleteItem(movie.id)}>
                                            <DeleteForeverRoundedIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
export default YoutubeAdministrador;