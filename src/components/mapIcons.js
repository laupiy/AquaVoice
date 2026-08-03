import L from 'leaflet'
import { statusColorHex } from './mapStatus'

export function createStationIcon(status, isActive = false) {
  const color = statusColorHex[status] || statusColorHex.safe
  const size = isActive ? 42 : 30
  const dot = isActive ? 20 : 14

  const html = `
    <div class="relative grid place-items-center" style="width:${size}px;height:${size}px;">
      ${status === 'critical' ? `<span class="ripple absolute" style="color:${color}"></span>` : ''}
      ${isActive ? `<span class="absolute rounded-full" style="width:${size}px;height:${size}px;background:${color}26;"></span>` : ''}
      <span class="relative rounded-full border-2 border-white" style="width:${dot}px;height:${dot}px;background-color:${color};box-shadow:0 2px 8px rgba(7,27,43,0.4);"></span>
    </div>
  `

  return L.divIcon({
    html,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 2],
  })
}
