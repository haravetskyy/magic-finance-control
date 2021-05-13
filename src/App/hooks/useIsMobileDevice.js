import { useWindowWidth } from './useWindowWidth'

export const useIsMobileDevice = () => {
  const width = useWindowWidth()

  return width <= 375
}
