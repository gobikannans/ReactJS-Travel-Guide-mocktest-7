import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

// Replace your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class App extends Component {
  state = {travelList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.packages.map(eachItem => ({
        description: eachItem.description,
        id: eachItem.id,
        imgUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      this.setState({
        travelList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoaderContainer = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelContainer = () => {
    const {travelList} = this.state
    return (
      <ul className="travel-list-container">
        {travelList.map(eachItem => (
          <li className="travel-list-item" key={eachItem.id}>
            <img src={eachItem.imgUrl} alt={eachItem.name} className="img" />
            <h1 className="travel-heading">{eachItem.name}</h1>
            <p className="travel-description">{eachItem.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderTravelApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTravelContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoaderContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="hr-line" />
        {this.renderTravelApiStatus()}
      </div>
    )
  }
}

export default App
