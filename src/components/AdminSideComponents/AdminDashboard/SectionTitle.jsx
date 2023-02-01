import styled from 'styled-components';

export default function SectionTitle({ children }) {
  return <TitleLayout>{children}</TitleLayout>;
}

const TitleLayout = styled.header`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding-left: 22%;
  padding-top: 30px;
  background: linear-gradient(to bottom, #2a93da, #3f6ad8);
  position: fixed;
  left: 0;
  top: 60px;
  box-shadow: 0 6px 10px 5px rgba(0, 0, 0, 0.2);

  > h1 {
    color: #ffffff;
    font-size: 30px;
    font-weight: 400;
  }

  > span {
    color: #ffffff;
    font-size: 20px;
  }
`;
