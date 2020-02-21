import React, { Component,ChangeEvent, } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import localRobots from './robots.js.js'

export interface IRobot {
  name: string,
  id: number,
  email: string
}
interface IAppProps {}
interface IAppState {
  robots: Array<IRobot>
  searchfield: string
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      robots: localRobots,
      searchfield: ''
    }
  }

  componentDidMount(): void {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => {this.setState({ robots: users})}).catch(err => console.error('ERR', err));
    }

  onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchfield: event.target.value })
  }

  render(): JSX.Element {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    console.log({robots});
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default App;
