import React  from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            jsondata: {}
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData(){
        fetch("http://localhost:8080/api/doshisha/circle/1")
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    jsondata: responseData,
                })
            })
    }
		render(){
			return(
                <p>{this.state.jsondata.name}({this.state.jsondata.university})</p>
			)
		}
}

ReactDOM.render(
	    <App />,
	    document.getElementById('root')
)
