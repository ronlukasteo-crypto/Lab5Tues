
import { Link } from 'react-router-dom'
import '../App.css'
import Footer from '../components/footer'
import Header from '../components/header'
import Section from '../components/section'
import { AppBar, Toolbar, TextField } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import { useState, useContext } from "react";
import { HeaderContext } from "../context/HeaderContext";
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'


function Home() {
  const year = new Date().getFullYear();
  const { headerText, setHeaderText } = useContext(HeaderContext);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
        <Header>
          <AppBar position="static" color="default">
            <Toolbar>
              <h1>
                {`Welcome ${headerText} to Codecraft Intranet`}
              </h1>
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/employee-management">Employee Management</Link></li>
                </ul>
              </nav>
            </Toolbar>
          </AppBar>
        </Header>

        <Section SecTitle ="Highlights">
          <h3>Remember to live out our values</h3>
          <ol>
              <li>Relentless Learning and Growth</li>
              <li>Creative Problem Solving</li>
              <li>Curiosity-Driven Exploration</li>
          </ol>

          <h3>Upcoming Events</h3>
          <ul>
              <li><b>Feb 7: </b> Employee Hack-a-ston</li>
              <li><b>Mar 7: </b> Food Bank Volunteering</li>
              <li><b>Apr 4: </b> Company Retreat</li>
          </ul>
        </Section>

        <Section SecTitle = "Latest Events">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis animi laudantium eos atque sed debitis eum deleniti cumque saepe aut voluptatibus, dolores commodi corporis quibusdam
              numquam perferendis, molestias tenetur suscipit!.</p>
          <img src={img1}
              style={{ width: '35%' }}
              alt="Kickball outing" />

          <img src={img2}
              style={{ width: '35%' }}
              alt="Happy Hour" />
        </Section>
        
        <Section SecTitle = "Title Button">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
              label="Enter text"
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary" 
              size="large"
              onClick={() => setHeaderText(inputValue)}>
              Click me
            </Button>
          </div>
        </Section>

        <Footer foot={`© ${year} CodeCraft Labs. All rights reserved.`}>
        </Footer>
    </>
  );
}

export default Home;