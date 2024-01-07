import { Grid } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";

const Home = () => {
    return(
        <div style={{textAlign: 'center'}}>
            <Banner/>
            <Grid container >
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories/>
                </Grid>
                <div style={{width: '83%'}}>
                    <Posts />
                </div>
            </Grid>
        </div> 
    )
}

export default Home;