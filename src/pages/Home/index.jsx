import MainContainer from '../../common/MainContainer';
import Wrapper from '../../common/Wrapper';
import Logo from '../../components/Dashboard/Logo';
import NavigationBar from '../../components/Dashboard/NavigationBar';
import TopMenu from '../../components/Dashboard/TopMenu';

export default function Home() {
  return (
    <Wrapper>
      <MainContainer>
        <Logo />
        <NavigationBar/>
        <TopMenu/>
      </MainContainer>
    </Wrapper>
  );
}
