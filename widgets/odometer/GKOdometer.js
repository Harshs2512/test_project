import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Odometer = dynamic(
  async () => {
    const mod = await import("react-odometerjs");
    return mod;
  },
  {
    ssr: false,
    loading: () => 0,
  }
);

const GKOdometer = ({ targetDate }) => {
  const [odometerLoaded, setOdometerLoaded] = useState(false);
  const [odometerDays, setOdometerDays] = useState(0);
  const [odometerHours, setOdometerHours] = useState(0);
  const [odometerMinutes, setOdometerMinutes] = useState(0);
  const [odometerSeconds, setOdometerSeconds] = useState(0);
  useEffect(() => {
    if (targetDate) {
      const countDownDate = new Date(targetDate).getTime();
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setOdometerDays(days);
        setOdometerHours(hours);
        setOdometerMinutes(minutes);
        setOdometerSeconds(seconds);

        if (distance < 0) {
          clearInterval(intervalId);
          setOdometerDays(0);
          setOdometerHours(0);
          setOdometerMinutes(0);
          setOdometerSeconds(0);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      console.error("Invalid targetDate:", targetDate);
    }
  }, [targetDate]);

  useEffect(() => {
    if (odometerLoaded) {
      setOdometerDays(odometerDays);
      setOdometerHours(odometerHours);
      setOdometerMinutes(odometerMinutes);
      setOdometerSeconds(odometerSeconds);
    }
    onLoadCallback();
  }, [
    odometerLoaded,
    odometerDays,
    odometerHours,
    odometerMinutes,
    odometerSeconds,
  ]);

  const onLoadCallback = () => {
    setOdometerLoaded(true);
  };

  return (
    <div className="d-flex gap-2 w-100">
      <div className="text-center p-md-2 p-sm-2 d-flex gap-2">
        <div
          className="text-md-h4 border rounded "
          style={{
            fontSize: "30px",
            width: "70px",
            backgroundColor: "pink",
            fontWeight: "bold",
          }}
        >
          <div className="">
            <span>
              <Odometer
                value={odometerDays}
                // style={{backgroundColor:"#070D08"}}
                className="mb-1 rounded border"
              />
            </span>
            <span>D</span>
          </div>
        </div>
        <div
          className="text-md-h4 border rounded "
          style={{
            fontSize: "30px",
            width: "70px",
            backgroundColor: "pink",
            fontWeight: "bold",
          }}
        >
          <span>
            <span className="">
              <Odometer value={odometerHours} className="mb-1 rounded border" />
            </span>
            <span>H</span>
          </span>
        </div>
        <div
          className="text-md-h4 border rounded "
          style={{
            fontSize: "30px",
            width: "75px",
            backgroundColor: "pink",
            fontWeight: "bold",
          }}
        >
          <span className="font-weight-bold">
            <Odometer
              value={odometerMinutes}
              className="mb-1 rounded border "
            />
            M
          </span>
        </div>
        <div
          className="text-md-h4 border rounded "
          style={{
            fontSize: "30px",
            width: "70px",
            backgroundColor: "pink",
            fontWeight: "bold",
          }}
        >
          <span>
            <Odometer value={odometerSeconds} className="mb-1 rounded border" />
            S
          </span>
        </div>
      </div>
    </div>
  );
};

export default GKOdometer;
