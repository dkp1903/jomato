import { Card, Rate } from "antd";
import './Restaurant.css'

const Restaurant = (props) => {

    return(
        <Card className="restaurant" hoverable>
            <img className="restaurant-image" alt="restaurant" src={props.restaurant.image} />
            <div className="restaurant-info">
                <div className="restaurant-info-text">
                    <div className="restaurant-title">
                        {props.restaurant.name}
                    </div>
                    <div className="restaurant-cost">
                        {`${props.restaurant.cost} for 1 person`}
                    </div>
                </div>
                <div className="restaurant-info-utility">
                    <div>
                        <Rate
                            className="restaurant-rating"
                            disabled={true}
                            defaultValue={props.restaurant.rating}
                        />
                    </div>

                </div>
            </div>
        </Card>
    )
}

export default Restaurant
