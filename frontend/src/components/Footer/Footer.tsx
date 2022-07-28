import { CSESoc } from "../image/imageIndex";
import { FooterWrapper, LinkText, Logo, TCsLink } from "./style";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterWrapper>
      <Logo src={CSESoc}  />
      <TCsLink>
        <Link to={'/termsandconditions'}>
          <LinkText>Terms and Conditions</LinkText>
        </Link>
      </TCsLink>
    </FooterWrapper>
  );
};

export default Footer;
