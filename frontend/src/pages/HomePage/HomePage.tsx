import { useState, useEffect } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import { Button,
         Container,
         Content,
         Flexbox,
         FlexboxComponent,
         Graphic,
         TextFlexbox,
         HomeText,
         ButtonFlexbox,
         HomeHeader,
         Logo,
         SmallContainer
} from "./style";
import reviewSrc from 'src/assets/graphics/review.svg';
import alluraSrc from 'src/assets/graphics/allura.svg';
import { UniLectives } from "src/components/image/imageIndex";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import { useAppDispatch, useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Footer from "src/components/Footer/Footer";
import {
  getCoursesDispatch,
  LoadingStatusTypes,
  selectCourse,
} from 'src/logic/redux/reducers/courseSlice/courseSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()

  const [loginDialog, setLoginDialog] = useState<boolean>(false)
  const [reviewModal, setReviewModal] = useState<boolean>(false)
  const { user } = useAppSelector(selectUser) || {}
  const { courses, loadingStatus } = useAppSelector(selectCourse) || {}

  useEffect(() => {
    dispatch(getCoursesDispatch())
  }, [])

  const [landingGraphic, setLandingGraphic] = useState<string>();
  const graphics = [reviewSrc, alluraSrc];
  const randomNumber = Math.floor(Math.random() * graphics.length);

  useEffect(() => {
    setLandingGraphic(graphics[randomNumber])
  }, [])

  return (
    <Content>
      <HomeHeader>
        <Logo src={UniLectives} />
      </HomeHeader>
      <Flexbox>
        <FlexboxComponent padding="10em">
          <TextFlexbox>
            <HomeText fontFamily={'Lato'} fontWeight={'bold'} fontSize="15px">
              CSEsoc Presents
            </HomeText>
            <HomeText fontFamily={'Poppins'}
                      fontWeight={'bold'}
                      fontSize="70px"
                      color="#1279F2">
              uni-lectives
            </HomeText>
            <HomeText fontFamily={'Lato'} fontWeight={'bold'} fontSize="15px">
              Your one stop shop for UNSW course and electives reviews.
            </HomeText>
            <ButtonFlexbox>
              <Button bg="#3B5DD5" onClick={() => alert('Browse')}>
                <HomeText fontFamily={'Lato'}>
                  Browse
                </HomeText>
              </Button>
              <Button bg="#72C1DA" onClick={() => alert('Add a review')}>
                <HomeText fontFamily={'Lato'} >
                  Add a Review
                </HomeText>
              </Button>
            </ButtonFlexbox>
          </TextFlexbox>
        </FlexboxComponent>
        <FlexboxComponent>
          <Graphic src={landingGraphic}/>
        </FlexboxComponent>
      </Flexbox>
      <Container>
        <SmallContainer>
          Hello1
          <Button onClick={() => setLoginDialog(true)}>Login</Button>
          {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
          <Text>User response:</Text>
          <Text>{JSON.stringify(user)}</Text>
          {loadingStatus === LoadingStatusTypes.GET_COURSES_COMPLETED &&
            courses?.courses.map((course) => (
              <Text key={course.courseCode}>{course.courseCode}</Text>
            ))}
          <Button onClick={() => setReviewModal(true)}>Submit a Review</Button>
          {reviewModal && <ReviewModal close={() => setReviewModal(false)} />}
        </SmallContainer>
        <Footer />
      </Container>
    </Content>
  );
};

export default HomePage
