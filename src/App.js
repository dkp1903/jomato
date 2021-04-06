import './App.css'
import 'antd/dist/antd.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Search from './components/Search/Search'

export const config = `http://localhost:8081/restaurants`

const App = () => {
  return (
    <div className="App">
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
