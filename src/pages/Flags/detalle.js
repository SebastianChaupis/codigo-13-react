import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Container, Chip } from "@mui/material";
import { getDataFromPokemon } from "../../service";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const DetailFlag = () => {
  const { name } = useParams();
  const history = useNavigate();
  const [country, setCountry] = useState({});

  const fetchDetailFlag = async () => {
    const response = await getDataFromPokemon(
      `https://restcountries.com/v3.1/name/${name}`
    );
    setCountry(response[0]);
  };

  useEffect(() => {
    fetchDetailFlag();
  }, []);

  return (
    <Container>
      <Button variant="outlined" onClick={()=> history(-1)}>
        <ArrowBackIosNewRoundedIcon>Back</ArrowBackIosNewRoundedIcon>
      </Button>
      {Object.keys(country).length > 0 && (
        <Grid
          container
          alignItems="center"
          spacing={3}
          sx={{ height: "100vh" }}
        >
          <Grid item md={6}>
            <img src={country?.flags?.svg} width={400} alt="" />
          </Grid>
          <Grid item md={6}>
            <h3>{country.name?.official}</h3>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <p>
                  <b>Native Name</b>: {country.name?.official}
                </p>
                <p>
                  <b>Population</b>: {country.population}
                </p>
                <p>
                  <b>Region</b>: {country.region}
                </p>
                <p>
                  <b>Sub Region</b> : {country.subregion}
                </p>
                <p>
                  <b>Capital</b>: {country.capital}
                </p>
              </Grid>
              <Grid item md={6}>
                <p>
                  <b>Top Level Domain</b>: {country.tld}
                </p>
                <p>
                  <b>Currencies</b>:{" "}
                  {Object.keys(country?.currencies).map((currency) => (
                    <span>{currency}</span>
                  ))}
                </p>
              </Grid>
              <Grid item md={12}>
                <h4>
                  Border Countries: &nbsp; &nbsp;
                  {country?.borders &&
                    Object.values(country?.borders).map((border) => (
                      <span>
                        <Chip label={border} />
                        &nbsp; &nbsp;
                      </span>
                    ))}
                </h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default DetailFlag;
