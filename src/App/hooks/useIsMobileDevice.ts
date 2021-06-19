import { useWindowWidth } from './useWindowWidth'

export const useIsMobileDevice = (): boolean => {
  const width = useWindowWidth()

  return width <= 375
}
