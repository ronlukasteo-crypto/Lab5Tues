import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Section from './components/section' 
import img1 from './assets/1.png'
import img2 from './assets/2.png'

function App () {
  const year = new Date().getFullYear()
  const name = "Lukas"
  
  return (
    <>
      <div>
      <Header
            title={
              <>
                {`Welcome ${name} to the `} 
                <span id="txt-red">CodeCraft</span>
                {` Labs Intranet`}
              </>
            }
          >
          <nav>
            <ul>
              <li>Home</li>
              <li>Employee Management</li>
              <li>JS Sandbox</li>
            </ul>
          </nav>
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

        year = new Date().getFullYear()
        <Footer foot= {`© ${year} CodeCraft Labs. All rights reserved.`}>
        </Footer>
      </div>
    </>
  )
}

export default App
