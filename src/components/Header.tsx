import useCart from "../hooks/useCart";
import Nav from "./Nav";

type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: HeaderProps) => {
  const { totalItems, totalPrice } = useCart();
  const content = (
    <header className="header">
      <div className="header_title-bar">
        <h1>11Blunts.Co</h1>
        <div className="header_price-box">
          <p>Total Items : {totalItems}</p>
          <p>Total Price : {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );

  return content;
};

export default Header;
