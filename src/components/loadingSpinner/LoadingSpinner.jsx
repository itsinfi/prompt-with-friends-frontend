import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
    return  (
                <ClipLoader size='200px' color='var(--primary)' cssOverride={{borderWidth: '20px', margin: '50px'}} />
            )
}

export default LoadingSpinner