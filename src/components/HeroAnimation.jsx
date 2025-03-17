import ladyimage from "../assets/pppp-removebg-preview.png";

const HeroAnimation = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <img src={ladyimage} alt="Lady Justice" style={{ height: "70vh" }} />
    </div>
  );
};

export default HeroAnimation;
