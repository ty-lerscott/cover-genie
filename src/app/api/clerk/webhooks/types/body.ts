export type GenericBody<T, U> = {
    event_attributes: {
        http_request: {
            client_ip: string,
            user_agent: string,
        }
    },
    instance_id: string,
    object: string,
    timestamp: number,
    data: T
    type: U,
}

