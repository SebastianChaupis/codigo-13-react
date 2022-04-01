import { Button, Grid, Card, TextField, CardContent } from "@mui/material";
import { useContext, useState } from "react";
import bgLogin from "../../assets/bg-login.png";
import { UserContext } from "../../Context/UserContext";
import swal from "sweetalert";

//si tenemos dos funciones con el mismo nombre podemos usar un alias en el import
import { storeUser as storeUserFirebase, loginUser } from "../../service/firestore";
import { async } from "@firebase/util";

const Login = () => {

    const { storeUser } = useContext(UserContext);

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    const handleClickLogin =async () => {
        //Primero hacemos hacer el login usuario
        const{email,password} = userData;
        let response = await loginUser(email,password);
        
        if(!response.ok){
           response = await storeUserFirebase(email,password);

            if(!response.ok){
                swal({
                    title:"Error",
                    text:response.data,
                    icon:"Error",
                });
                return;
            }
        };
        storeUser(response.data.user)
        window.location.href="/youtube/admin";
    };

    return (
        <Grid container
            spacing={3}
            alignItems="center"
            justifyContent="space-around"
            sx={{ height: '100vh', backgroundColor: "#FAD57F" }}>
            <Grid item md={6}>
                <img src={bgLogin} width={800} alt="" />
            </Grid>
            <Grid item md={6}>
                <Card sx={{ width: 500, marginLeft: '130px', marginTop: '50px' }}>
                    <CardContent>
                        <h5>Welcome</h5>
                        <h3>Tecsup-Codigo</h3>
                        <p>Comunidad CogiGo. aprendemos a programar paginas web.</p>
                        <Grid container spacing={3} mt={5}>
                            <Grid item md={12}>
                                <TextField label="Email" name="email" onChange={handleChangeInput} fullWidth ></TextField>
                            </Grid>
                            <Grid item md={12}>
                                <TextField type="password" label="Password" name="password" onChange={handleChangeInput} fullWidth></TextField>
                            </Grid>
                            <Grid item md={12}>
                                <Button sx={{ backgroundColor: "#000" }} variant="contained" onClick={handleClickLogin} fullWidth>Iniciar Sesion</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
export default Login;