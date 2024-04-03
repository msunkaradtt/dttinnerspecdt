import {gql} from "@apollo/client"

export const ADD_MODEL = gql`
    mutation createModel(
        $model_id: Int!
        $model_name: String!
        $model_info: JSON!
        $model_created: String!
    ) {
        insertModels(
            model_id: $model_id
            model_name: $model_name
            model_info: $model_info
            model_created: $model_created
        ) {
            model_id
            model_name
        }
    }
`

export const DELETE_MODEL_BY_ID = gql`
    mutation deleteModel(
        $model_id: Int!
    ) {
        deleteModels(
            model_id: $model_id
        ) {
            model_id
            model_name
        }
    }
`