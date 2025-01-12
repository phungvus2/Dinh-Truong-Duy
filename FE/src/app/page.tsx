"use client"

import React, {useEffect, useState, useRef} from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// * Import CSS file, you can use CSS module if you want
// ! Change your CSS inside this file
import './page.css'

// I changed the first letter from capital to normal, to fit the json and not be undefined 
// Maybe there's another way but I don't have enough time for this
interface Kols {
	kolID: number;
	userProfileID: number;
	language: string;
	education: string;
	expectedSalary: number;
	expectedSalaryEnable: boolean;
	channelSettingTypeID: number;
	iDFrontURL: string;
	iDBackURL: string;
	portraitURL: string;
	rewardID: number;
	paymentMethodID: number;
	testimonialsID: number;
	verificationStatus: boolean;
	enabled: boolean;
	activeDate: Date;
	active: boolean;
	createdBy: string;
	createdDate: Date;
	modifiedBy: string;
	modifiedDate: Date;
	isRemove: boolean;
	isOnBoarding: boolean;
	code: string;
	portraitRightURL: string;
	portraitLeftURL: string;
	livenessStatus: boolean;
}

const Page = () => {
    // * Use useState to store Kols from API 
    // ! (if you have more optimized way to store data, PLEASE FEELS FREE TO CHANGE)
	const [Kols , setKols] = useState<Kols[]>([]);  
	const [maxItem, setMaxItem] = useState();
	var currentItem = -1;


    // * Fetch API over here 
    // * Use useEffect to fetch data from API 
    useEffect(() => {
		const fecthData = async() =>{
			const res = await fetch("http://localhost:8081/kols");
			const data = await res.json()
			console.log(">> check res: ", data);

			if (data.kol && data) {
				setMaxItem(data.pageSize)
				setKols(data.kol);
			}
			
		}
		fecthData();
    }, []);
	console.log( "size: ", maxItem)

	const kolRef = useRef<HTMLTableRowElement | null >(null);
	

    return (
        <>
		<Container fluid>
			<Row>
				<Col>
				<h1 id="-1" className='header'>KOL list</h1>
				</Col>
			</Row>
			<Row>
				<Table size="lg" striped bordered hover>
				<thead>
				<tr>
					<th>KolID</th>
					<th>UserProfileID</th>
					<th>Language</th>
					<th>Education</th>
					<th>ExpectedSalary</th>
					<th>ChannelSettingTypeID</th>
					<th>IDFrontURL</th>
					<th>IDBackURL</th>
					<th>PortraitURL</th>
					<th>RewardID</th>
					<th>PaymentMethodID</th>
					<th>TestimonialsID</th>
					<th>ActiveDate</th>
					<th>Code</th>
					<th>PortraitRightURL</th>
					<th>PortraitLeftURL</th>
					<th>LivenessStatus</th>
				</tr>
				</thead>
				
				<tbody>
				{Kols?.map(kol => {
					console.log(kol.code);
					return <tr ref={kolRef} id={String(Kols.indexOf(kol))}>
						 <td>{kol.kolID}</td>
						 <td>{kol.userProfileID}</td>
						 <td>{kol.language}</td>
						 <td>{kol.education}</td>
						 <td>{kol.expectedSalary}</td>
						 <td>{kol.channelSettingTypeID}</td>
						 <td>{kol.iDFrontURL}</td>
						 <td>{kol.iDBackURL}</td>
						 <td>{kol.portraitURL}</td>
						 <td>{kol.rewardID}</td>
						 <td>{kol.paymentMethodID}</td>
						 <td>{kol.testimonialsID}</td>
						 <td>{String(kol.activeDate)}</td>
						 <td>{kol.code}</td>
						 <td>{kol.portraitRightURL}</td>
						 <td>{kol.portraitLeftURL}</td>
						 <td>{kol.livenessStatus}</td>
						 </tr>
				})}
				</tbody>
				
				</Table>
			</Row>
			<Row>
			<div className="buttonContainer">
				<Button variant='primary' onClick={() =>{
					
					if (currentItem >= 0){
						currentItem--;
						const element = document.getElementById(String(currentItem));
						element?.scrollIntoView({
							behavior: 'smooth'
						});
						console.log(" up current: ", element);
					}
					
					
					
				}}>Scroll up</Button>
				<Button onClick={() =>{
					
					if (maxItem && currentItem < maxItem - 10){
						currentItem++;
						const element = document.getElementById(String(currentItem));
						element?.scrollIntoView({
							behavior: 'smooth'
						});
						console.log(" down current: ", element);
					}
					
				}}>Scroll down </Button>
			</div>
			</Row>
		
			
			
		</Container>
           
			
				
			
        </>
    )
};

export default Page;