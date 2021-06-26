import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DailyToDo from "components/daily-todo";
import { ToDos } from "components/to-dos";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <ToDos />
                    </Route>
                    <Route path="/daily-todo/:id">
                        <DailyToDo />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
