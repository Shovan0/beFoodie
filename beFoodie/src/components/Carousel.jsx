import React from 'react'
import './Carousel.css'

function Carousel() {
  return (
    <>
      <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel" data-interval="3000">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleFade" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleFade" data-slide-to="1"></li>
          <li data-target="#carouselExampleFade" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://wallpaperaccess.com/full/767294.jpg" style={{filter:"brightness(60%)"}} class="d-block w-100" alt="Slide 1" />
          </div>
          <div class="carousel-item">
            <img src="https://wallpaperaccess.com/full/767257.jpg" style={{filter:"brightness(60%)"}} class="d-block w-100" alt="Slide 2" />
          </div>
          <div class="carousel-item">
            <img src="https://wallpaperaccess.com/full/767270.jpg" style={{filter:"brightness(60%)"}} class="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

    </>
  )
}

export default Carousel