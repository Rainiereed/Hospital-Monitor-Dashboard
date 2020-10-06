const dev = {
    apiGateway: {
        URL: "https://fb2axp3u5i.execute-api.eu-west-1.amazonaws.com/dev"
    },
    awsmobile: {
        aws_project_region: "eu-west-1",
        aws_cognito_region: "eu-west-1",
        aws_user_pools_id: "eu-west-1_oWBLjlaWz",
        aws_user_pools_web_client_id: "4d56cf2nen94t31fqfhm9di63b"
    }
};

const prod = {
    apiGateway: {
        URL: "https://ezkf5n7ss5.execute-api.eu-west-1.amazonaws.com/prod"
    },
    awsmobile: {
        aws_project_region: "eu-west-1",
        aws_cognito_region: "eu-west-1",
        aws_user_pools_id: "eu-west-1_t31Xpo5YV",
        aws_user_pools_web_client_id: "71nk5nj2rt3a22dni5vqilcv4l"
    }
};

const config = process.env.REACT_APP_STAGE === 'prod' ?
    prod :
    dev;

export default {
    REFRESH_INTERVAL: 3000,
    ...config
};
