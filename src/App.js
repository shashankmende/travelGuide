import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

// Replace your code here
class App extends Component {
  state = {List: [], isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    const data = await response.json()

    const newData = data.packages.map(each => ({
      description: each.description,
      id: each.id,
      imageUrl: each.image_url,
      name: each.name,
    }))
    console.log('new data=', newData)
    if (response.ok === true) {
      this.setState({
        List: newData,
        isLoading: false,
      })
    }
  }

  render() {
    const {List, isLoading} = this.state

    console.log('list from render', List)
    return (
      <div className="bg-container">
        <h1 className="heading">Travel Guide</h1>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travel-list">
            {List.map(each => (
              <li key={each.id} className="travel-item">
                <img src={each.imageUrl} alt={each.name} className="image" />
                <h1>{each.name}</h1>
                <p>{each.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default App
