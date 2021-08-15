import React from 'react'

// https://www.taniarascia.com/using-context-api-in-react/

const ConfigurationContext: any = React.createContext([])

export const ConfigurationProvider = ConfigurationContext.Provider
export const ConfigurationConsumer = ConfigurationContext.Consumer

export default ConfigurationContext
