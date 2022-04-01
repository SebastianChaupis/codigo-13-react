import { useContext, useEffect, useState } from "react";
import { Container, Card, Grid, CardContent, Button } from "@mui/material";
import { UserContext } from "../../Context/UserContext";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import "./index.css";

const BasketView = () => {
    const { basket, addOrRemoveProduct,deleteElementFromBasket } = useContext(UserContext);

    const [total, setTotal] = useState(0);

    const calculatePrice = () => {
        let sum = 0;
        basket.forEach((product) => {
            const finalPrice = +product.quantity * +product.price_sale;
            sum += finalPrice;

        });
        setTotal(sum.toFixed(2));
    }
    useEffect(() => {
        calculatePrice();
        //Esto va a indicar que si la variable basket cambia de valor
        //esto automaticamente va a llamar a la funcion que esta dentro del useEffect
    }, [basket]);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} mt={5}>
                <Grid item md={8}>
                    <h3>Bolsa de compras</h3>
                    <Grid container spacing={3}>
                        {
                            basket.map(product => (
                                <Grid item md={12}>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={3} mt={5}>

                                                <Grid item md={3}>
                                                    <img src={product.photo}
                                                        style={{ objectFit: "contain" }}
                                                        width={150}
                                                        height={150} />
                                                </Grid>
                                                <Grid item md={3}>
                                                    <h4>{product.name}</h4>
                                                </Grid>
                                                <Grid item md={3}>
                                                    <h4>{product.price}</h4>
                                                    <h4>{product.price_sale}</h4>
                                                </Grid>
                                                <Grid item md={3}>
                                                    <div>
                                                        <Button onClick={() => addOrRemoveProduct(product.id, false)}>
                                                            <RemoveRoundedIcon />
                                                        </Button>
                                                        &nbsp;&nbsp;
                                                        {product.quantity}
                                                        &nbsp;&nbsp;
                                                        <Button onClick={() => addOrRemoveProduct(product.id, true)}>
                                                            <AddRoundedIcon />
                                                        </Button>
                                                    </div>
                                                    <Button className="btnEliminar" onClick={()=>deleteElementFromBasket(product.id)} color="error">
                                                        <DeleteForeverRoundedIcon />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <h4>Total Precio</h4>
                    <p>SubTotal: {total}</p>
                    <Button variant="contained" size="large">Realizar pago</Button>
                </Grid>

            </Grid>
        </Container>
    )
}
export default BasketView;