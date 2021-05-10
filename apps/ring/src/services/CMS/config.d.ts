import { Config } from 'types/config'

// getConfig
export type GetConfig = ({ ref }: { ref?: string }) => Promise<Config>
