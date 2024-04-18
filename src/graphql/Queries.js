import {gql} from "@apollo/client"

export const GET_ALL_MODELS = gql`
    query GetAllModels {
        modelsList {
            model_id
            model_name
            model_info
            model_created
        }
    }
`