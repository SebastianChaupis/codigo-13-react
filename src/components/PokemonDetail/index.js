import { useState, props, useEffect } from "react";
import { Button, Dialog, DialogContent, Grid, Chip, Slider } from "@mui/material";
import { getDataFromPokemon } from "../../service";

const PokemonDetail = (props) => {
    const [open, setOpen] = useState(false);

    const [pokemonData, setPokemonData] = useState({});

    const fetchDetailFromPokemon = async () => {
        const pokemon = await getDataFromPokemon(props.url);
        setPokemonData(pokemon);
        console.log(pokemon);
    };
    //funcion que se encargue de cambiar el estado 
    /*
    const openDialog =()=>{
        setOpen(true);
    }
    const closeDialog =()=>{
        setOpen(false);
    }
    */

    const handleOpenDialog = async () => {
        if (!open) {
            await fetchDetailFromPokemon();
        }
        setOpen(!open);
    }
    return (
        <div>
            <Button onClick={handleOpenDialog} variant="contained" color="primary">Detalle del Pokemon</Button>

            <Dialog open={open} onClose={handleOpenDialog} fullWidth={"md"} maxWidth={"md"}>
                <DialogContent>
                    {/* Esto extrae los keys de un objeto */}
                    {Object.keys(pokemonData).length > 0 &&
                        (
                            <div >
                                <h2 className="name-pokemon"> {props.nombre}</h2>
                                <Grid container>
                                    <Grid item md={6}>
                                        <h4>Habilidades</h4>
                                        {pokemonData.abilities.map((abilitie) => (
                                            <Chip label={abilitie.ability.name}
                                                color="primary" sx={{ marginRight: 2 }} />
                                        ))}
                                        <h4>Datos</h4>
                                        {pokemonData.types.map((type) => (
                                            <Chip label={type.type.name} color="warning" sx={{ marginRight: 2 }} />
                                        ))}
                                        <Chip label={`${pokemonData.height / 10} m`} color="success" sx={{ marginRight: 2 }} />
                                        <Chip label={`${pokemonData.weight / 10} kg`} color="success" sx={{ marginRight: 2 }} />
                                        <h4>Estadisticas</h4>
                                        {pokemonData.stats.map((stat) => (
                                            <div>
                                                <h5>{stat.stat.name}</h5>
                                                <Slider
                                                    defaultValue={+stat.base_stat}
                                                    aria-label="Always visible"
                                                    valueLabelDisplay="on"
                                                    disabled
                                                />
                                            </div>
                                        ))}
                                    </Grid>
                                    <Grid item md={6} className="center">
                                        <img width={300} src={pokemonData.sprites.other["official-artwork"].front_default} alt="" />
                                        <Grid container>
                                            <Grid item sm={6}>
                                                <img src={pokemonData.sprites.versions["generation-iii"].emerald["front_shiny"]} />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <img src={pokemonData.sprites.versions["generation-iii"]
                                                ["firered-leafgreen"]["back_shiny"]} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </div>
                        )}
                    <Button onClick={handleOpenDialog}>Cerrar</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PokemonDetail;