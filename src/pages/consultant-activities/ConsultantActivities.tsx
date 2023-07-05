import Footer from "../../components/footer/Footer";
import "./ConsultantActivities.scss";
import useProfile from "./../../store/useProfile";
import { formatStringDate } from "../../utils/dateConverter";

const ConsultantActivities = () => {
  const { userActivity } = useProfile((state) => state);

  return (
    <>
      <main className="main consultant-activity">
        <h2>Activity</h2>
        <div>
          {userActivity.map((activity, index) => (
            <p key={index}>
              {formatStringDate(activity.timestamp)} - {activity.action}
            </p>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ConsultantActivities;
