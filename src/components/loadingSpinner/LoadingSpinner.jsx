import ClipLoader from "react-spinners/ClipLoader";
import Card from "../card/Card";

const LoadingSpinner = () => {
    return (
                <Card>
                    <ClipLoader size='200px' color='var(--primary)' cssOverride={{borderWidth: '20px', margin: '50px'}} />
                </Card>
            )
}

export default LoadingSpinner