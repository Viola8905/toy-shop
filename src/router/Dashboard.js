import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';


const Dashboard = () => {
	return (
		<div className='wrapper'>
			<Header/>
			<div className="main">
				<Outlet/>
			</div>
			<Footer/>
		</div>
	)
}

export default Dashboard