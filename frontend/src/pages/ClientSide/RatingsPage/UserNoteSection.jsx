import styled from 'styled-components';

export default function UserNoteSection({ ratingObject, setRatingObject }) {
  function handleInput(e) {
    setRatingObject({
      ...ratingObject,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Container>
      <InputField>
        <h3>Nome</h3>
        <input placeholder="Digite seu nome" name="name" value={ratingObject.name} onChange={handleInput} type="name" />
      </InputField>
      <InputField>
        <h3>E-mail</h3>
        <input
          placeholder="Digite seu melhor e-mail"
          name="email"
          value={ratingObject.email}
          onChange={handleInput}
          type="email"
        />
      </InputField>
      <InputField>
        <h3>Escreva abaixo sua opinião. Toda crítica e elogio são bem vindos!</h3>
        <textarea
          placeholder="Fique à vontade para escrever aquilo que desejar..."
          name="userNote"
          value={ratingObject.userNote}
          onChange={handleInput}
        />
      </InputField>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 55%;
  padding-left: 20px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid #b4b1b1;

  > h3 {
    font-size: 16px;
    font-weight: 700;
    color: #121111;
    margin-bottom: 10px;
  }

  > input {
    background-color: inherit;
    border: none;
    outline: none;

    &::placeholder {
      font-style: italic;
    }
  }

  > textarea {
    background-color: inherit;
    height: 110px;
    border: none;
    resize: none;
    outline: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
      sans-serif;

    &::placeholder {
      font-style: italic;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
        sans-serif;
    }
  }
`;
