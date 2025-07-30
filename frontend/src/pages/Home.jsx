import React from 'react'
import Station from '../components/Home/Station';
import Graph from '../components/Home/Graph';
import RecentPassenger from '../components/Home/RecentPassenger';

const Home = () => {
  return (
    <div>
      <Station/>
      <Graph/>
      <RecentPassenger/>
    </div>
  )
}

export default Home;