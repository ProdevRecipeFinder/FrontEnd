import type { NextPage } from 'next'
import React from 'react'
import Card from '../components/Card/Card'

const Home: NextPage = () => {
  return (
    <React.Fragment>

      <Card 
        title="Harissa Egg Salad" 
        img="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5615023.jpg&w=595&h=595&c=sc&poi=face&q=60" 
        desc="Boiled eggs, avocado, and harissa are stars in this spicy twist on a classic. Serve on toast or try in lettuce leaves for a refreshing touch."/>

    </React.Fragment>
  )
}

export default Home
