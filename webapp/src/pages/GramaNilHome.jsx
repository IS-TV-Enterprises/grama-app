import HelpForm from "../components/HelpForm";
import GramaTable from "../components/GramaTable";
import Banner from "../components/GNilBanner";

function GramaNilHome() {
  return (
    <div className="App">
      {/* <HelpForm /> */}
      <Banner />
      <div id="gramatable">
        <GramaTable />
      </div>
    </div>
  );
}

export default GramaNilHome;
