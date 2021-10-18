import { Container, Title, ItemContainer } from "./styles/category";
import Movie from "../Movie";

const Category = ({ title, items }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ItemContainer>
        {items.map((item) => (
          <Movie key={item.id} data={item} />
        ))}
      </ItemContainer>
    </Container>
  );
};

export default Category;
