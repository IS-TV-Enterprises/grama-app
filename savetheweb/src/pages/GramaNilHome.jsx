import GramaTable from "../components/GramaTable";
import Banner from "../components/GNilBanner";

function GramaNilHome() {
  return (
    <div className="App">
      <Banner />
      <div id="gramatable">
        <GramaTable />
      </div>
    </div>
  );
}

export default GramaNilHome;