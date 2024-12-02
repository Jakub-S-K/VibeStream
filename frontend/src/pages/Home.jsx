import artist from '../assets/img/artist2.png'

function Home() {
  return (
    <>
      <main>
        {/*=============== HOME ===============*/}
        <section className="home" id="home">
          <div className="home__container container">
              <div className="home__data">
                <h1 className="home__title">VibeStream</h1>
                <p className="home__text">For Artists Ready to Rise</p>
                <p className="home__text">& Fans Ready to Listen</p>
              </div>

              <div className="home__image-box">
                <div className="home__shape"></div>

                <img src={artist} alt="artist" className="home__img-1" />
              </div>
          </div>
        </section>

        {/*=============== ARTISTS ===============*/}
        <section className="artists section" id="artists">
          <h2 className="section__title">Our rising artists</h2>

          <div className="artists__container container">
            <p className="artists__text">Artists avatars here</p>
          </div>
        </section>

        {/*=============== ABOUT ===============*/}
        <section className="about section" id="about">
          <div className="about__container container">
            <div className="about__shape">
                <div className="about__circle"></div>
            </div>

            <div className="about__data">
              <h2 className="section__title">About our platform</h2>
          
              <p className="about__text">
                  <span>VibeStream</span> is a platform where fresh talent meets passionate listeners. Our mission is to connect new artists with a supportive audience, making it easy for creators to share their music and for fans to discover unique sounds. 
              </p>
              <p className="about__text">
                  <span>Join us</span> to explore, connect, and be part of the future of music—one track at a time.
              </p>
            </div>
          </div>
        </section>

        {/*=============== TRENDING ===============*/}
        <section class="trending section" id="trending">
          <h2 class="section__title">Trending</h2>

          <div class="trending__container container">
            <p class="trending__text">Trending albums here</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home