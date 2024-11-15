import PlayButton from "./PlayButton";
import "../styles/components/items-display.css";
import ItemCard from "./ItemCard";
import ItemDescription from "./ItemDescription";
import "../styles/components/items-display.css";

const ItemsDisplay = ({
  setOffset,
  preferenceType,
  setPreferenceType,
  response,
  randomItem,
  setRandomItem,
  artistsResponse,
}) => {
  const reloadItems = () => {
    if (response && preferenceType !== "Artists") {
      const totalItems = response.total;
      if (totalItems < 50) {
        setOffset(0);
      } else if (totalItems > 50) {
        setOffset(Math.floor(Math.random() * Math.max(0, totalItems - 50)));
      }
      const newrandomItem =
        response.items[Math.floor(Math.random() * response.items.length)];
      setRandomItem(newrandomItem);
    } else if (artistsResponse && preferenceType === "Artists") {
      const newrandomItem =
        artistsResponse[Math.floor(Math.random() * artistsResponse.length)];
      setRandomItem(newrandomItem);
    }
    console.log(randomItem);
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
            preferenceType={preferenceType}
            response={response}
            randomItem={randomItem}
          ></ItemDescription>
          <PlayButton
            randomItem={randomItem}
            preferenceType={preferenceType}
          ></PlayButton>
        </div>
      )}
    </div>
  );
};

export default ItemsDisplay;
