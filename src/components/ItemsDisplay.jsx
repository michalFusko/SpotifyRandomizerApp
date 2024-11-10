import PlayButton from "./PlayButton";
import "../styles/components/items-display.css";
import ItemCard from "./ItemCard";
import ItemDescription from "./ItemDescription";
import "../styles/components/items-display.css";

const ItemsDisplay = ({
  Albums,
  Playlists,
  Podcasts,
  Artists,
  setOffset,
  preferenceType,
  setPreferenceType,
  response,
  randomItem,
  setRandomItem,
}) => {
  const reloadItems = () => {
    if (response && response.total) {
      const totalItems = response.total;
      if (totalItems < 50) {
        setOffset(0);
      } else if (totalItems > 50) {
        setOffset(Math.floor(Math.random() * Math.max(0, totalItems - 50)));
      }
      const newrandomItem =
        response.items[Math.floor(Math.random() * response.items.length)];
      setRandomItem(newrandomItem);
    }
  };

  return (
    <div className="main-container">
      {randomItem && (
        <ItemCard
          preferenceType={preferenceType}
          setPreferenceType={setPreferenceType}
          response={response}
          randomItem={randomItem}
          reloadItems={reloadItems}
        ></ItemCard>
      )}
      {randomItem && (
        <div className="main-description-container">
          <ItemDescription
            Albums={Albums}
            Playlists={Playlists}
            Podcasts={Podcasts}
            Artists={Artists}
            preferenceType={preferenceType}
            response={response}
            randomItem={randomItem}
          ></ItemDescription>
          <PlayButton randomItem={randomItem}></PlayButton>
        </div>
      )}
    </div>
  );
};

export default ItemsDisplay;
