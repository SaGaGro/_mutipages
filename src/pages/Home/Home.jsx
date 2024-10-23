import React from 'react'
import './Home.css'

function Home() {
  return (
    <div>
      <div className='home-container'>
        <div className='picture'>
          <img src="/_mutipages/few.jpg" alt="Logo Profile" />
        </div>
        <div className='info-container'>
          <div className='info'>
            <h1 className='name'>Kunatip U-tong</h1>
            <hr />
            <h2>I'm Studying at Sripatum University, Faculty of Information Technology, majoring in CSI, in year 2, semester 1 ❤️🖥️</h2>
          </div>
        </div>
        <div className='footer-container-home'>
          <div className='footer'>
            <h1>About Me</h1>
            <div className='contact'>
              <div className='img1'>
                <a href="https://www.instagram.com/kunatip.utong/" target="_blank" rel="noopener noreferrer">
                  <img src="/_mutipages/image.png" alt="IG" />
                </a>
              </div>
              <div className='img2'>
                <a href="https://www.facebook.com/share/aK3vZsxz8iBesbyR/?mibextid=LQQJ4d" target="_blank">
                  <img src="/_mutipages/facebook.png" alt="FACEBOOK" />
                </a>
              </div>
              <div className='img3'>
                <a href="https://github.com/SaGaGro" target="_blank" rel="noopener noreferrer">
                  <img src="/_mutipages/Github.png" alt="GITHUB" />
                </a>
              </div>
              <div className='img4'>
                <a href="https://line.me/R/ti/p/yasuofucking" target="_blank" rel="noopener noreferrer">
                  <img src="/_mutipages/line.png" alt="LINE" />
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home