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
  preferenceTypeRes,
  randomItem,
  setRandomItem,
  setOffset,
  isLoadingAlbums,
}) => {
  const reloadItems = () => {
    if (preferenceTypeRes && preferenceTypeRes.total) {
      const totalItems = preferenceTypeRes.total;
      if (totalItems < 50) {
        setOffset(0);
      } else if (totalItems > 50) {
        setOffset(Math.floor(Math.random() * Math.max(0, totalItems - 50)));
      }
      const newrandomItem =
        preferenceTypeRes.items[
          Math.floor(Math.random() * preferenceTypeRes.items.length)
        ];
      setRandomItem(newrandomItem);
    }
  };

  return (
    <div
      className="main-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {randomItem && (
        <ItemCard
          isLoadingAlbums={isLoadingAlbums}
          Albums={Albums}
          Playlists={Playlists}
          Podcasts={Podcasts}
          Artists={Artists}
          preferenceTypeRes={preferenceTypeRes}
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
            preferenceTypeRes={preferenceTypeRes}
            randomItem={randomItem}
          ></ItemDescription>
          <PlayButton randomItem={randomItem}></PlayButton>
        </div>
      )}
    </div>
  );
};

export default ItemsDisplay;
