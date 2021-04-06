import { useState, useEffect, useLayoutEffect } from 'react'
import { Input, message, Button } from "antd";
import { config } from "../../App";
import Header from "../Header/Header";
import Restaurant from "../Restaurant/Restaurant";
import { Row, Col } from "antd";
import axios from 'axios';
import Footer from "../Footer/Footer";
import "./Search.css";

const Search = () => {
    let debounceTimeout = 0
    //let restaurants = []
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [filteredRestaurants, setFiltered] = useState([])

    const validateResponse = (err, res) => {
        if (err || (!res.data.length )) {
            if (err)
                console.log(err)
            message.error('Could not fetch. Please check if backend is running. ')
            return false
        }
        
        if(!res.data.length) {
            message.error( "No restaurants found")
            return false
        }

        return true
    } 

    const performAPICall = async() => {
        let response = {}
        let err = false

        setLoading(true)

        try {
           response = await axios.get(config)
           console.log(response)
           
        } catch(error) {
            err = true
        }

        setLoading(false)

        if (validateResponse(err, response))
            return response
        
    }

    const getRestaurants = async () => {
        const response = await performAPICall()
        console.log('rere', response)
        if(response) {
            
            setRestaurants(response.data)
            
            setFiltered(response.data)
            console.log(restaurants.length)
            
        }
    }

    useEffect(() => {
        console.log('Use effect')
        getRestaurants()
        console.log('Get res: ', restaurants.length)
    }, [])

    const search = (text) => {
        console.log('Went into search')
        const newRes = restaurants.filter(
            restaurant => restaurant.name.toUpperCase().includes(text.toUpperCase())
        )
        console.log("Newres", newRes)
        setFiltered(newRes)
    }

    const debounceSearch = ( event ) => {
        const value = event.target.value

        if (debounceTimeout) 
            clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => search(value), 300)
    }

    const sortByName = () => {
        setFiltered(restaurants.sort((a, b) => {
            if (a.name.toUpperCase() > b.name.toUpperCase())
                return -1
            return 1
            }))
        console.log('After sort> ', restaurants)
        
    }

    const getRestaurantElement = ( restaurant ) => {
        console.log('Get res element')
        return (
            <Col 
                xs={24} 
                sm={12} 
                xl={6} 
                key={restaurant.id}
            >
                <Restaurant restaurant = {restaurant}/>

            </Col>
        )
    }

    return (
       <>
            
                <Input.Search 
                    placeholder="Search"
                    onSearch={search}
                    onChange={debounceSearch}
                    enterButton={true}
                />
            <div className="sort-button">
                <Button type="primary"onClick={sortByName}>Sort by name</Button>
            </div>
           
            <Row>
                <Col
                    xs={{span: 24}}
                    md={{ span: restaurants.length ? 18: 24}}

                >
                <div className="search-container">
                    <Row>
                        {(restaurants.length !== 0) ? (
        
                            filteredRestaurants.map(restaurant => 
                                getRestaurantElement(restaurant)
                            )

                        ) : loading ? (
                            <div className="loading-text"><Button type="primary" loading>Loading</Button> </div>
                            
                        ) : <div className="loading-text">Nothing to show </div>
                        }  
                    </Row>
                </div>

                </Col>
                
                
            </Row>
            

       </>
    )
}

export default Search