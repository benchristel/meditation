import {render, h} from "preact"
import {Main} from "./app/main"
import "./test-results"
import "./reset.css"
import "./global-types"

render(<Main />, document.getElementById("app")!)
