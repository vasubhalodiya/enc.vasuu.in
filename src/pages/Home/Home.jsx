import './Home.css';
import Vaults from '../../components/Vaults/Vaults';
import VaultsData from '../../components/VaultsData/VaultsData';

const Home = ({ searchQuery }) => {
  return (
    <>
      <div className="home">
        <div className="home-cnt master-cnt">
          <Vaults searchQuery={searchQuery} />
          <VaultsData />
        </div>
      </div>
    </>
  )
}

export default Home;
