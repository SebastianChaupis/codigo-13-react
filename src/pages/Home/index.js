import { useState, useEffect } from "react";
import { Container, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { getDataFromPokemon } from "../../service";


import PokemonDetail from "../../components/PokemonDetail";
//vamos a ejecutar la funcion que se encargara de traer los pokemones

const Home = () => {
    const imgUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
    //vamos a crear una variable que se encague de guardar la lista de pokemones
    const [pokemones, setPokemon] = useState([]);
    //creamos una funcion la cual se encarga de ejecutar la funcion getDataFromPokemon y 
    //la data que retorne la funcion guardarla usando setPokemon
    const fetchPokemonList = async () => {
        const listPokemones = await getDataFromPokemon();
        //ahora como ya recuperamos la lista de los pokemones hay que usar la funcion
        // setPokemon para poder guardar la lista de pokemones
        //console.log("listPokemones.results", listPokemones.results);
        setPokemon(listPokemones.results);
    };
    //En React existe una funcion llamada useEffect la cual se ejecuta cada vez que se carga la pagina, vamos 
    // a usar useEffect si queremos ejecutar algo al inicio de la aplicacion
    useEffect(() => {
        //aca llamamos la funcion que se quiere ejecutar
        fetchPokemonList();
        // IMPORTANTE AL EJECUTAR "useEffect"  DEBEMOS COLOCAR UN ARRAY VACION PARA EVITAR QUE SE HAGA UN BUCLE
        //INFINITO, SI NO COLOCAMOS EL ARRAY VACIO LA FUNCION QUE EJECUTA "useEffect" SE EJECTURAR INFINITAS VECES 
    }, []);

    return (
        <Container>
            <h1>Pokedex</h1>
            {/*pokemons.lenght > 0 && "lleno" ----------> if*/}
            {/*pokemons.lenght > 0 ? "lleno" : "vacio" ----------> if else*/}
            <Grid container spacing={5}>
                {pokemones.length > 0 &&
                    pokemones.map((pokemon, index) => (
                        <Grid item md={4}>
                            <Card className="card-pokemon">
                                <CardMedia className="img-pokemon" component="img" image={`${imgUrl}${index + 1}.svg`} />
                                <CardContent className="center">
                                    <h3 className="name-pokemon">{pokemon.name}</h3>
                                    {/*vamos a pasarle el nombre como atributo*/}
                                    <PokemonDetail nombre={pokemon.name} url={pokemon.url}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>
            ) : (
            <h1>No hay datos</h1>
            )


        </Container>
    );
};
export default Home;