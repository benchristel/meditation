import {h} from "preact"

export default function Spacer(props: {size: number | string}) {
  return <div style={{width: props.size, height: props.size}} />
}
