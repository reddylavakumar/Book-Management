import { useParams } from "react-router-dom";
import BookDetails from "../../components/BookDetails/BookDetails";
const About = () => {
  console.log(useParams.toString);

  return (
    <div>
      <BookDetails />
    </div>
  );
};

export default About;
