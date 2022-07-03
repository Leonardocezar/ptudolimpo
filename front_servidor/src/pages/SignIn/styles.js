import styled from "styled-components";
import um from "~/assets/1.jpg";
import dois from "~/assets/2.jpg";
import tres from "~/assets/3.jpg";
export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${dois});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  border-width: 0px;
  padding: 20px;
  margin: 40px 0px;

  @media (min-width: 320px) {
    width: 280px;
    padding: 20px;
  }
  @media (min-width: 375px) {
    width: 320px;
    padding: 20px;
  }

  @media (min-width: 425px) {
    width: 375px;
    padding: 20px;
  }

  @media (min-width: 768px) {
    width: 450px;
    padding: 20px;
  }
`;

export const Logo = styled.img`
  align-self: center;
  height: 150px;
  margin: 0px 0px 40px 0px;
`;
