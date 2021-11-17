import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-purple-600' : 'bg-gray-400'
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Use RIR</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 p-0.5 transform bg-white rounded-full`}
      > 
      </span>
    </Switch>
  )
}