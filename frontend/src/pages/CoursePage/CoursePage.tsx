import { useParams } from "react-router-dom";

const CoursePage = () => {
    const { courseCode }= useParams();

    return (
        <div>{courseCode}</div>
    );
};

export default CoursePage;
