import React from "react";
import classes from "./home.module.scss";

function Home() {
  return (
    <section className={classes.home_page}>
      <div className={classes.container}>
        <h1>
          Creativity <br /> Beyond <br /> Life
        </h1>
      </div>
      <div className={classes.text}>
        Do you wanna chat with your friends? <br />
        Click on Join button on Navbar
      </div>
    </section>
  );
}

export default Home;
