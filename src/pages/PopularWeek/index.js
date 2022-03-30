import { useState, useEffect, useContext } from "react";
import { Container, Grid, Button } from "@mui/material";
import "./index.css";
import { getProductClothes } from "../../service/firestore";
import { UserContext } from "../../Context/UserContext";

const PopularWeek = () => {

    const {storeBasket} = useContext(UserContext);


    const [clothes, setClothes] = useState([]);
    const fetchClothes = async()=>{
        const data= await getProductClothes();
        setClothes(data)
    }
    useEffect(()=>{
        fetchClothes();
    },[]);
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} mt={5}>
                <Grid item md={12}>
                    <h2 className="center">PopularWeek</h2>
                </Grid>
                {clothes.length > 0 && clothes.map((clothe) => (
                    <Grid item md={3} sm={6} xs={12}>
                        <img className="product-photo" src={clothe.photo} alt=""></img>
                        <div className="description">
                            <p>{clothe.name}</p>
                            <p className="container-buttons">
                                <span className="price">$
                                    {clothe.price_sale}
                                </span>
                                <span className="price-tacched">$ {clothe.price}</span>
                                <Button className="button-basket" onClick={()=>storeBasket(clothe)}>+ Add to Basket</Button>
                            </p>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
};
export default PopularWeek
