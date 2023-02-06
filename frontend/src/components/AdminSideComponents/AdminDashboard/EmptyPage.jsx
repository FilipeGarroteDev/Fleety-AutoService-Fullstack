import styled from 'styled-components';

export default function EmptyPage({ children }) {
  return (
    <EmptyPageLayout>
      <h1>Fleety</h1>
      {children}
    </EmptyPageLayout>
  );
}

const EmptyPageLayout = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 25px;
  align-items: center;
  color: #3f6ad8;


  > h1 {
    font-family: 'Playball', sans-serif;
    font-size: 60px;
  }

  > span {
    width: 60%;
    font-size: 22px;
    text-align: center;
  }
`;
