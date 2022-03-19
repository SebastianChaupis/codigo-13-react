import { useState, useEffect } from "react";
import { CardContent, Card, CardMedia, Container, Grid, TextField, MenuItem, FormControl, InputLabel,Select } from "@mui/material";
import { getDataFromPokemon } from "../../service";

const Flags = () => {
    const [countries, setCountries] = useState([]);

    const [region,setRegion]=useState([]);

    const fetchCountries = async () => {
        const response = await getDataFromPokemon("https://restcountries.com/v2/all");
        setCountries(response);
    }

    const handleRegion =async(e)=> {
        setRegion(e.target.value);

        //Primero limpiamos contries para poder llenarlo con la nueva informacion

        const response = await getDataFromPokemon(`https://restcountries.com/v2/region/${e.target.value}`);
        setCountries(response);
    }

    useEffect(() => {
        fetchCountries();
    }, []);
    return (
        <Container>
            <Grid container spacing={3} mt={5}>
                <Grid item md={6}>
                    <TextField label="Search for a country..." />
                </Grid>
                <Grid item md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Filter by Region</InputLabel>
                        <Select label="Filter by Region" value={region} onChange={handleRegion}>
                            <MenuItem value="Africa">Africa</MenuItem>
                            <MenuItem value="Americas">Americas</MenuItem>
                            <MenuItem value="Asia">Asia</MenuItem>
                            <MenuItem value="Europa">Europa</MenuItem>
                            <MenuItem value="Oceania">Oceania</MenuItem>                            
                        </Select>
                    </FormControl>
                </Grid>
                {
                    countries.length > 0 && countries.map(country => (
                        <Grid item md={3} xs={12}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height={200}
                                    image={country.flags.svg}
                                />
                                <CardContent>
                                    <h4>{country.name}</h4>
                                    <p>Population:{country.population}</p>
                                    <p>Region:{country.region}</p>
                                    <p>Capital{country.capital}:</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>

    )
}
export default Flags