import { useState, useEffect } from "react";
import { Button, Container, Grid } from "@mui/material";
import { updateUserProfile, auth, sendEmail } from "../../service/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./index.css"
const Profile = () => {

    const [user, setUser] = useState(null);

    const update = async () => {
        const profile = {
            displayName: "Sebastiaaaaan",
            photoURL: "https://avatars.githubusercontent.com/u/98132797?v=4",
        };
        await updateUserProfile(profile);
        getUser();
    };

    const getUser = () => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user);
            }else{
                console.log("user not found");
            }
        });
    };

    const fetchSendEmail = async()=>{
        const response= await sendEmail();      
    }

    useEffect(() => {
        getUser();
    }, []);
    return (

        <Container>
            {user &&(
                <Grid container spacing={3}>
                <Grid item md={12}>
                    <h1>Perfil de Usuario</h1>
                </Grid>
                <Grid item md={4}>
                    <img className="img-circle" width={350} src={user?.photoURL}></img>
                </Grid>
                <Grid item md={4}>
                    <h4>{user?.displayName}</h4>
                    <p>{user?.email}</p>
                    <Button onClick={update} variant="contained">
                        Actualizar perfil
                    </Button>
                    <Button onClick={fetchSendEmail} color="secondary" variant="contained">
                        Confirmar Cuenta
                    </Button>
                </Grid>
            </Grid>
            )}
            
        </Container>
    )
}
export default Profile;