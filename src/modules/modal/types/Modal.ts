import React from "react"

export type Modal = {
  name: string,
  render: () => React.ReactElement,
}