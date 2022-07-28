import { CircleIcon, StarIcon } from './style';

type ReviewRatingProps = {
    icon: string
};

// create new ratings component which will be used to display the ratings
const ReviewRating = ({icon}: ReviewRatingProps) => {
    const maxRating = 5;
    return (
        <div>
            <div>
                {Array(maxRating).fill(0).map(() => {
                    return (
                        icon === "star" ? (
                            <StarIcon fontSize="large"/>
                        ) : (
                            <CircleIcon fontSize="small"/>
                        )
                    )
                })}
            </div>
        </div>
    )
}

export default ReviewRating;
